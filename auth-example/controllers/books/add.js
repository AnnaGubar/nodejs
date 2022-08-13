const { Book, schemas } = require("../../models/book");

const { createError } = require("../../helpers");

const add = async (req, res) => {
    
    const { error } = schemas.add.validate(req.body);
    if (error) {
        throw createError(400, error.message);
    }

    // console.log(req.user)
    
    // находим id авториз. пользователя
    const {id: owner} = req.user;
    // добавляем id авториз. пользователя к обьекту книги
    const result = await Book.create({...req.body, owner});
    
    res.status(201).json(result);
}

module.exports = add;