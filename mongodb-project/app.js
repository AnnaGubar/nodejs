const mongoose = require("mongoose");

// const DB_HOST = "mongodb+srv://Anna:p686a5DEHb6GIEmF@cluster0.98jknkg.mongodb.net/book_reader?retryWrites=true&w=majority";

require("dotenv").config(); // забирает DB_HOST с файла .env

// console.log(process.env)
console.log(process.env.DB_HOST)
const {DB_HOST} = process.env;

// подключение к БД
mongoose.connect(DB_HOST)
    .then(() => console.log("Database connect success"))
    .catch(error => error.message)