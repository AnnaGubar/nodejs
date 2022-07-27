const productsOperations = require("./methods/methods");
// console.log("⭐ ~ productsOperations", productsOperations)

/*
1. Получить все товары - productsOperations.getAll
2. Получить один товар по id - productsOperations.getById
3. Добавить товар - productsOperations.add
4. Обновить товар по id - productsOperations.updateById
5. Удалить товар по id - productsOperations.removeById
*/

const invokeAction = async ({ action, id, data }) => {
  switch (action) {
    case "getAll":
      // console.log(3)

      const products = await productsOperations.getAll();
      console.log(products);
      break;

    case "getById":
      const product = await productsOperations.getById(id);
      if (!product) {
        throw new Error(`Product with id=${id} not found`);
      }
      console.log(product);
      break;

    case "add":
      const newProduct = await productsOperations.add(data);
      console.log(newProduct);
      break;

    case "updateById":
      const updateProduct = await productsOperations.updateById(id, data);
      if (!updateProduct) {
        throw new Error(`Product with id=${id} not found`);
      }
      console.log(updateProduct);
      break;

    case "removeById":
      const removeProduct = await productsOperations.removeById(id);
      console.log(removeProduct);
      break;

    default:
      console.log("Unknown action");
  }
};

//* getAll
// invokeAction({action: "getAll"});

//* getById
// const id = "767580d5-f509-4f45-98f9-28e74ec4af66"; // ✔
// const id = "767580d5-f509-4f45-98f9"; // ✖

// invokeAction({action: "getById", id});

//* add
// const newData = {
//     name: "iPhone X",
//     price: 17000,
//     location: "Apple store"
// }

// invokeAction({action: "add", data: newData});

//* updateById
const updateId = "89495552-bd91-43ac-a580-3fc34a486876";

// const updateData = {
//     name: "iPhone X",
//     price: 16000,
//     location: "Apple store"
// }

// invokeAction({action: "updateById", id: updateId, data: updateData});

//* removeById
// invokeAction({action: "removeById", id: updateId});
