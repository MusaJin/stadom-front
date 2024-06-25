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
      const texts = messages
        .filter(data => data.channel_post && data.channel_post.text) // фильтруем элементы, у которых есть channel_post и текст
        .map(data => data.channel_post.text); // извлекаем текст

      console.log(texts);
      res.json(texts);
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
