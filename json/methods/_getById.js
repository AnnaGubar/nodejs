const getAll = require("./_getAll");

const getById = async(id)=> {
    const products = await getAll();
    const result = products.find(item => item.id === id);

    //иммитация ответа от бэкэнда
    if(!result){
        return null;
    }
    
    return result;
}

module.exports = getById;