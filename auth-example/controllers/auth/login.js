const bcrypt = require("bcryptjs"); // хеширование

const {basedir} = global;
const {User, schemas} = require(`${basedir}/models/user`);
const {createError} = require(`${basedir}/helpers`);

const login = async (req, res) => {
    // валидируем полученные данные
    const {error} = schemas.login.validate(req.body);
    if(error){
        throw createError(400, error.message);
    }

    // получаем из введенных данных
    const {email, password} = req.body;
    // проверяет существует ли данный email в БД
    const user = await User.findOne({email});
    // если нет то сообщение об ошибке
    if(!user){
        throw createError(401, "Email wrong");
    }
    // если да то проверяем равен ли введенный пароль к хешированному из БД
    const comparePassword = await bcrypt.compare(password, user.password);
    // если нет то сообщение об ошибке
    if(!comparePassword) {
        throw createError(401, "Password wrong");
    }
    // если да то создаем токен входа
    const token = "hfsfg.asdsdgsfg.2224eh";

    res.json({
        token,
    })
}

module.exports = login;