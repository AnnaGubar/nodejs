// ⌨ node express-example-4

const express = require("express");
const cors = require("cors");

const productsRouter = require("./routes/api/products");

const app = express();

app.use(cors());

// указываем express в каком формате ожидаем данные
app.use(express.json());

app.use("/api/products", productsRouter);

app.listen(4444);