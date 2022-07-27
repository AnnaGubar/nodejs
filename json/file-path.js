// console.log(2)

//* абсолютный путь к файлу
console.log(__dirname)

const path = require("path");

const filePath = path.join(__dirname, "products.json");
// console.log(filePath)

module.exports = filePath;