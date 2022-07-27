const fs = require("fs/promises");

const filePath = require("../file-path");

const updateProducts = async(products)=> {
    await fs.writeFile(filePath, JSON.stringify(products));
}

module.exports = updateProducts;