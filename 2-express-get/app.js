// ⌨ node 2-express-get

const express = require("express");

const products = require("./products");

const app = express();

// app.set работает только для res.json
app.set("json spaces", 30);

app.get("/products", (req, res) => {
  // res.json(products); // для отправки данных
  // res.send(products); // для отправки разметки
  // res.render("products", {name: "iPhone"} ); // для сложной разметки
  // "products"- путь к шаблону
  // {name: "iPhone"} - передаваемые в шаблон данные.

  // res.json({
  //     status: "success",
  //     code: 200,
  //     data: {
  //         result: products
  //     }
  // });
  
  // res.json(null); // null выводит в браузер
  // res.send(null); // null не выводит в браузер
});

app.listen(3000);
