const { basedir } = global;
const { User } = require(`${basedir}/models/user`);

const logout = async (req, res) => {
    // находим пользователя
    const { _id } = req.user;
    // обнуляем токен
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).send();
}

module.exports = logout;