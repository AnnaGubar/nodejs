const fs = require("fs/promises");

const filePath = require("../file-path");

const getAll = async () => {
  // console.log(4);

  const data = await fs.readFile(filePath);
  const products = JSON.parse(data);
  return products;
};

module.exports = getAll;
