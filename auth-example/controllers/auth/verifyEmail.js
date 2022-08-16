const {basedir} = global;
const {User} = require(`${basedir}/models/user`);
const {createError} = require(`${basedir}/helpers`);

const verifyEmail = async(req, res) => {
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken});
    // пользователь либо не регистрировался либо уже подтвердил свою почту
    if(!user) {
        throw createError(404);
    }

    // верификация пройдена - verify: true
    // делаем ссылку для верификации не актуальной - verificationToken: ""
    await User.findByIdAndUpdate(user._id, {verificationToken: "", verify: true});
    
    res.json({
        message: 'Verification successful'
    });
}

module.exports = verifyEmail;