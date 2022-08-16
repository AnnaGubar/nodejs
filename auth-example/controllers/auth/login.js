const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {basedir} = global;

const {User, schemas} = require(`${basedir}/models/user`);

const {createError} = require(`${basedir}/helpers`);

const {SECRET_KEY} = process.env;

const login = async (req, res) => {
    const {error} = schemas.login.validate(req.body);
    if(error){
        throw createError(400, error.message);
    }

    const {email, password} = req.body;
    const user = await User.findOne({email});
    // пользователь не зарегестрирован или не верно ввели почту
    if(!user){
        throw createError(401, "Email wrong");
    }
    // пользователь не зарегестрирован или не подтвердил почту
    if(!user.verify){
        throw createError(401, "Email not verify");
    }
    
    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword) {
        throw createError(401, "Password wrong");
    }
    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"});
    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        token,
    })
}

module.exports = login;