const express = require("express"); 
const logger = require("morgan");
const cors = require("cors");

// ✅ express 1 - создание веб-сервера
const app = express();

// ✅ express 2 - создание обработчиков адресов
const booksRouter = require("./routes/api/books");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// ✅ express 3 - привязываем обработчики к веб-серверу
app.use("/api/books", booksRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// ✅ express 4 - в server.js запускаем веб-сервер
module.exports = app;
