// ⌨ node 3-express-use

//* use() - создание промежуточного обработчика middleware
//* middleware должны передавать обработку дальше через метод next()
// Если не указан адрес, то middleware используется для всех запросов/адресов

const express = require("express");
const fs = require("fs/promises");
const moment = require("moment"); // работа с датой
const cors = require("cors");

const products = require("./products");
 
const app = express();

app.use(cors()); // решает кросс-доменные запросы

app.use(async(req, res, next)=> {
    const {method, url} = req;
    const date = moment().format("DD-MM-YYYY_hh:mm:ss");
    await fs.appendFile("3-express-use/server.log", `\n${method} ${url} ${date}`);
    next();
})

app.use((req, res, next)=> {
    console.log("First middleware");
    next();
});

app.use((req, res, next)=> {
    console.log("Second middleware");
    next();
})

app.get("/products", (req, res)=> {
    res.json(products);
})

app.listen(4444, ()=>console.log('start'));