const express = require("express");
const cors = require("cors");
const multer = require("multer"); // работа с хранением файлов
const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // раздает файлы с папки "public" (можно увидеть в html-странице)

//* настраивание multer как сохранять файл

const tempDir = path.join(__dirname, "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir, // где сохранять
  // под каким именем сохранять
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048, // загружать не больше чем 2мб
  },
});

// создание middleware для хранения
const upload = multer({
  storage: multerConfig,
});

const books = [];

// взять один файл(single) из поля "cover"
app.post("/api/book", upload.single("cover"), async (req, res) => {
  try {
    console.log(req.body); // [Object: null prototype] { name: 'hello' }
    console.log(req.file); // полная инфа про файл

    const booksDir = path.join(__dirname, "public", "books"); // пусть к папке books

    const { path: tempPath, originalname } = req.file; // где сохранило файл
    const uploadPath = path.join(booksDir, originalname); // куда перенести файл

    //   await fs.rename("./temp/cover.jpg", "./public/books/cover.jpg"); // перемещает файл
    await fs.rename(tempPath, uploadPath); // ⬆ аналог

    const cover = path.join("books", originalname); // путь к файлу - " books\\cover.jpg"

    const newBook = {
      name: req.body.name,
      cover,
      id: nanoid(),
    };
    books.push(newBook);

    res.status(201).json(newBook);
  } catch (error) {
    await fs.unlink(req.file.path); // если не смогло переместить удаляет файл во временной папке temp
  }
});

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.listen(3000);
