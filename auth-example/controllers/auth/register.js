const bcrypt = require("bcryptjs"); // хеширование

const {basedir} = global;
const {User, schemas} = require(`${basedir}/models/user`);
const {createError} = require(`${basedir}/helpers`);

const register = async(req, res)=> {
    // валидируем полученные данные
    const {error} = schemas.register.validate(req.body);
    if(error){
        throw createError(400, error.message);
    }

    // получаем из введенных данных
    const {email, password} = req.body;
    // проверяет существует ли данный email в БД
    const user = await User.findOne({email});
    // если да то оповещение
    if(user) {
        throw createError(409, `${email} is already exist`);
    }
    // если нет то хешируем пароль
    const hashPassword = await bcrypt.hash(password, 10);
    // и создаем пользователя 
    const result = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        name: result.name,
        email: result.email,
    })
}

module.exports = register;