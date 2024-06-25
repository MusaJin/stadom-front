const express = require('express');
const cors = require('cors');
const axios = require('axios');

const token = '7016936881:AAG1_PDvfJx1M5rUqk85CJ-phxo0cCytC18';
const chatId = '-1002152382917';
const app = express();
const port = 3000;

app.use(cors());

app.get('/get_messages', async (req, res) => {
  try {
    const url = `https://api.telegram.org/bot${token}/getUpdates?chat_id=${chatId}`;

    const response = await axios.get(url);

    if (response.data.ok) {
      const messages = response.data.result;

      // Фильтруем и извлекаем тексты и фотографии с подписями
      const textsAndPhotos = messages.map(data => {
        if (data.channel_post) {
          if (data.channel_post.text) {
            return data.channel_post.text;
          } else if (data.channel_post.caption && data.channel_post.photo) {
            return {
              caption: data.channel_post.caption,
              photo: data.channel_post.photo
            };
          }
        }
        return null;
      }).filter(item => item !== null);

      console.log(textsAndPhotos);
      res.json(textsAndPhotos);
    } else {
      res.status(500).json({ error: 'Failed to fetch messages from Telegram API' });
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
