const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST) // подключаемся к БД
  .then(()=> app.listen(PORT)) // если успешно то запускается веб-сервер
  .catch(error => {
    console.log(error);
    process.exit(1);
  })

