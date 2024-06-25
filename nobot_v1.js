const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { Api } = require('telegram/tl');

const token = '7016936881:AAG1_PDvfJx1M5rUqk85CJ-phxo0cCytC18';
const apiId = '29935427'; // Замените на ваш API ID
const apiHash = '3f9d305d33401379c340b6f88a93ac24'; // Замените на ваш API Hash
const stringSession = new StringSession(''); // Пустая строка для первой авторизации

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

const downloadPhoto = async (client, photo, filePath) => {
    try {
        const result = await client.downloadMedia(photo, {
            dcId: photo.dcId,
            fileSize: photo.fileReference.length,
        });

        return new Promise((resolve, reject) => {
            const writer = fs.createWriteStream(filePath);
            writer.write(result);
            writer.end();
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error('Ошибка при загрузке фотографии:', error);
    }
};

const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};

app.get('/get_messages', async (req, res) => {
    try {
        const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });
        await client.start({
            phoneNumber: async () => await prompt('Введите ваш номер телефона: '),
            password: async () => await prompt('Введите ваш пароль: '),
            phoneCode: async () => await prompt('Введите код, отправленный в Telegram: '),
            onError: (err) => console.log(err),
        });

        console.log('Вы вошли в систему!');

        const result = await client.invoke(
            new Api.messages.GetHistory({
                peer: chatId,
                offsetId: 0,
                offsetDate: 0,
                addOffset: 0,
                limit: 100,
                maxId: 0,
                minId: 0,
                hash: 0,
            })
        );

        const messages = result.messages;
        const staticDir = path.join(__dirname, 'static');
        if (!fs.existsSync(staticDir)) {
            fs.mkdirSync(staticDir);
        }

        const textsAndPhotos = await Promise.all(messages.map(async data => {
            const date = formatDate(data.date);
            if (data.message || data.media) {
                let message = { message_id: data.id, date, text: data.message || '', caption: '' };

                if (data.media && data.media.photo) {
                    const photo = data.media.photo.sizes[data.media.photo.sizes.length - 1];
                    const filePath = path.join(staticDir, `${data.id}.jpg`);
                    await downloadPhoto(client, data.media.photo, filePath);

                    message.photo = {
                        file_id: data.media.photo.id,
                        file_size: photo.size,
                        width: photo.w,
                        height: photo.h,
                        url: `/refs/${data.id}.jpg`
                    };
                }

                if (data.media && data.media.caption) {
                    message.caption = data.media.caption;
                }

                return message;
            }
            return null;
        }));

        console.log(textsAndPhotos);
        res.json(textsAndPhotos.filter(item => item !== null));

        await client.disconnect();
    } catch (error) {
        console.error('Ошибка при получении сообщений:', error);
        res.status(500).json({ error: 'Не удалось получить сообщения' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

function prompt(question) {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => rl.question(question, (ans) => {
        rl.close();
        resolve(ans);
    }));
}
