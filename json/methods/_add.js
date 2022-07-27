const { v4 } = require("uuid");

const getAll = require("./_getAll");

const updateProducts = require("./_updateProducts");
// const fs = require("fs/promises"); // работа с файлом
// const filePath = require("../file-path"); // абсолютный путь products.json


const add = async (data) => {
  // получает products, добавляет newProduct в полученный products -> не перезаписывает products.json
  const products = await getAll();
  const newProduct = { ...data, id: v4() };
  products.push(newProduct);

  // получает изменения и перезаписывает сам файл products.json
  await updateProducts(products);
//   await fs.writeFile(filePath, JSON.stringify(products));


  return newProduct;

};

module.exports = add;
