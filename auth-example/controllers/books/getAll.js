const { Book } = require("../../models/book");

/*
если коллекции связаны -> метод populate находит поле "owner" в нем id по нему переходит в user 
и забирает указанные поля "name email" - id user всегда остается
*/

const getAll = async (req, res) => {
    // пагинация: параметры запроса хранятся в req.query
    // console.log(req.query);
    const {page = 1, limit = 20} = req.query; // значения по дефолту

    // если page=1 - ничего не пропускает, показывает первые 20 книг
    // если page=2 - пропускает первую страницу(первые 20книг), показывает вторые 20 книг
    const skip = (page - 1) * limit;

    // получаем id авторизю пользователя
    const {id: owner} = req.user;
    // получает коллекцию книг авториз. пользователя
    // пагинация: find третьим аргументом получает дополнительные настройки поиска
    const result = await Book.find({owner}, "-createdAt -updatedAt", {skip, limit: Number(limit)}).populate("owner", "name email");
    
    res.json(result);
}

module.exports = getAll;