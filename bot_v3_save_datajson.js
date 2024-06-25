const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const chatId = 'YOUR_CHAT_ID';
const app = express();
const port = 3000;

// Файл для хранения последнего update_id и сообщений
const dataFile = path.join(__dirname, 'data.json');

const corsOptions = {
  origin: '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use('/refs', express.static('static'));

// Функция для загрузки данных из файла
const loadData = () => {
  if (fs.existsSync(dataFile)) {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  }
  return { update_id: 0, messages: [] };
};

// Функция для сохранения данных в файл
const saveData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
};

const downloadPhoto = async (fileId, filePath) => {
  try {
    const fileUrl = `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`;
    const fileResponse = await axios.get(fileUrl);
    const filePathOnServer = fileResponse.data.result.file_path;
    
    const downloadUrl = `https://api.telegram.org/file/bot${token}/${filePathOnServer}`;
    
    const response = await axios({
      url: downloadUrl,
      method: 'GET',
      responseType: 'stream',
    });
    
    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Ошибка при загрузке фотографии:', error);
  }
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toISOString().split('T')[0]; // Получаем дату в формате YYYY-MM-DD
};

app.get('/get_messages', async (req, res) => {
  const data = loadData();
  const url = `https://api.telegram.org/bot${token}/getUpdates?offset=${data.update_id + 1}`;

  try {
    const response = await axios.get(url);

    if (response.data.ok) {
      const messages = response.data.result;

      const staticDir = path.join(__dirname, 'static');
      if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir);
      }

      const textsAndPhotos = await Promise.all(messages.map(async message => {
        if (message.channel_post) {
          const date = formatDate(message.channel_post.date);
          if (message.channel_post.text) {
            return { message_id: message.update_id, text: message.channel_post.text, date };
          } else if (message.channel_post.caption && message.channel_post.photo) {
            const photo = message.channel_post.photo[message.channel_post.photo.length - 1];
            const filePath = path.join(staticDir, `${photo.file_id}.jpg`);
            await downloadPhoto(photo.file_id, filePath);

            return {
              message_id: message.update_id,
              caption: message.channel_post.caption,
              date,
              photo: {
                file_id: photo.file_id,
                file_size: photo.file_size,
                width: photo.width,
                height: photo.height,
                url: `/refs/${photo.file_id}.jpg`
              }
            };
          }
        }
        return null;
      }));

      // Обновляем данные
      if (messages.length) {
        data.update_id = messages[messages.length - 1].update_id;
      }
      data.messages.push(...textsAndPhotos.filter(item => item !== null));
      saveData(data);

      res.json(data.messages);
    } else {
      res.status(500).json({ error: 'Не удалось получить сообщения из Telegram API' });
    }
  } catch (error) {
    console.error('Ошибка при получении сообщений:', error);
    res.status(500).json({ error: 'Не удалось получить сообщения' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
