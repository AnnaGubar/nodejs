const getAll = require("./_getAll");
const updateProducts = require("./_updateProducts");

const updateById = async(id, data)=> {
    const products = await getAll();
    const idx = products.findIndex(item => item.id === id);

    // метод findIndex возвр. -1 если не находит 
    if(idx === -1){
        return null;
    }
    
    products[idx] = {...data, id};
    await updateProducts(products);
    return products[idx];
}

module.exports = updateById;