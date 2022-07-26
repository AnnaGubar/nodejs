const yargs = require("yargs");
const {hideBin} = require("yargs/helpers");

const productsOperations = require("./products");

const invokeAction = async({action, id, data})=> {
    switch(action){
        case "getAll":
            const products = await productsOperations.getAll();
            console.log(products);
            break;
        case "getById":
            const product = await productsOperations.getById(id);
            if(!product){
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
            if(!updateProduct){
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
}

//* node ex-yargs --action getById --id 61c0169c-e693-4a20-af3e-2e55fdc34f79
//* node ex-yargs --action getAll

// const arr = hideBin(process.argv);
// console.log(arr)

// const {argv} = yargs(arr);
// console.log(argv)

// аналог ⬆
const {argv} = yargs(process.argv.slice(2));
// console.log(argv)

invokeAction(argv);