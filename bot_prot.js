const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { Bot } = require('grammy');

const token = '7016936881:AAG1_PDvfJx1M5rUqk85CJ-phxo0cCytC18';
const chatId = '-1002152382917';
const app = express();
const port = 3000;

const corsOptions = {
  origin: '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use('/refs', express.static('static'));

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

  // Извлекаем день, месяц и год из объекта Date
  const day = date.getDate().toString().padStart(2, '0'); // Получаем день месяца (при необходимости добавляем ведущий ноль)
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Получаем месяц (нумерация месяцев начинается с нуля)
  const year = date.getFullYear(); // Получаем год

  // Собираем дату в формате dd.mm.yyyy
  return `${day}.${month}.${year}`;
};


app.get('/get_messages', async (req, res) => {
  try {
    const url = `https://api.telegram.org/bot${token}/getUpdates?chat_id=${chatId}`;

    const response = await axios.get(url);

    if (response.data.ok) {
      const messages = response.data.result;

      const staticDir = path.join(__dirname, 'static');
      if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir);
      }

      const textsAndPhotos = await Promise.all(messages.map(async data => {
        if (data.channel_post) {
          const date = formatDate(data.channel_post.date);
          if (data.channel_post.text) {
            return { text: data.channel_post.text, date };
          } else if (data.channel_post.caption && data.channel_post.photo) {
            const photo = data.channel_post.photo[data.channel_post.photo.length - 1];
            const filePath = path.join(staticDir, `${photo.file_id}.jpg`);
            await downloadPhoto(photo.file_id, filePath);

            return {
              message_id: data.channel_post.message_id,
              caption: data.channel_post.caption,
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

      console.log(textsAndPhotos)
      res.json(textsAndPhotos.filter(item => item !== null));
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
