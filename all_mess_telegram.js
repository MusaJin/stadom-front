const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { Api } = require("telegram/tl");
const axios = require("axios");

const token = "7016936881:AAG1_PDvfJx1M5rUqk85CJ-phxo0cCytC18";
const apiId = 29935427;
const apiHash = "3f9d305d33401379c340b6f88a93ac24";
const stringSession = new StringSession("");

const chatId = "-1002152382917";
const app = express();
const port = 3000;

const corsOptions = {
  origin: "*",
  methods: ["GET"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use("/refs", express.static("static"));

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
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Ошибка при загрузке фотографии:", error);
  }
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

app.get("/get_messages", async (req, res) => {
  try {
    const client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });
    await client.start({
      phoneNumber: async () => await prompt("Введите ваш номер телефона: "),
      password: async () => await prompt("Введите ваш пароль: "),
      phoneCode: async () =>
        await prompt("Введите код, отправленный в Telegram: "),
      onError: (err) => console.log(err),
    });

    console.log("Вы вошли в систему!");

    const result = await client.invoke(
      new Api.messages.GetHistory({
        peer: chatId,
        offsetId: 0,
        offsetDate: 0,
        addOffset: 0,
        limit: 100000,
        maxId: 0,
        minId: 0,
        hash: 0,
      })
    );

    const messages = result.messages;
    const staticDir = path.join(__dirname, "static");
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir);
    }

    const textsAndPhotos = await Promise.all(
      messages.map(async (data) => {
        const date = formatDate(data.date);
        if (data.message || data.media) {
          let message = {
            message_id: data.id,
            date,
            caption: data.message || "",
            images: [],
          };

          if (data.media && data.media.photo) {
            const photoSizes = data.media.photo.sizes;
            const largestPhoto = photoSizes[photoSizes.length - 1];
            const filePath = path.join(staticDir, `${data.id}.jpg`);
            await downloadPhoto(client, data.media.photo, filePath);

            message.images.push(`/refs/${data.id}.jpg`);
          }

          if (data.media && data.media.caption) {
            message.caption = data.media.caption;
          }

          // Check if the message has multiple photos
          if (data.media && data.media.webpage) {
            const webpagePhotos = data.media.webpage.photo.sizes;
            if (webpagePhotos.length > 1) {
              for (let i = 1; i < webpagePhotos.length; i++) {
                const photo = webpagePhotos[i];
                const filePath = path.join(staticDir, `${data.id}_${i}.jpg`);
                await downloadPhoto(client, data.media.webpage.photo, filePath);

                message.images.push(`/refs/${data.id}_${i}.jpg`);
              }
            }
          }

          // Prepare the image URLs as a comma-separated string
          const imagesStr = message.images.join(",");

          axios
            .get(
              `http://musaku0d.beget.tech/api/add_news.php?title=${message.caption}&text=${message.caption}&img=${imagesStr}&src=''&titlevid=''&datevid=''&date=${date}`
            )
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(`Проблема с запросом: ${error.message}`);
            });

          return message;
        }
        return null;
      })
    );

    console.log(textsAndPhotos);

    res.json(textsAndPhotos.filter((item) => item !== null));

    await client.disconnect();
  } catch (error) {
    console.error("Ошибка при получении сообщений:", error);
    res.status(500).json({ error: "Не удалось получить сообщения" });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

function prompt(question) {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(question, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}
