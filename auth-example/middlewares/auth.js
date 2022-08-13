const jwt = require("jsonwebtoken");

const { basedir } = global;
const { User } = require(`${basedir}/models/user`);
const { createError } = require(`${basedir}/helpers`);
const { SECRET_KEY } = process.env;

const auth = async (req, _, next) => {
  // берем из заголовков заголовок authorization
  const { authorization = "" } = req.headers;

  // проверяем, что первое слово в заголовке - Bearer
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(createError(401));
  }

  try {
    // проверяем что второе слово в заголовке токен, который мы шифровали, и он не истек
    const { id } = jwt.verify(token, SECRET_KEY);

    // поиск в базе пользователя с id, закодированом в токене
    const user = await User.findById(id);
  
    if (!user || !user.token) {
      next(createError(401));
    }

    // прикрепляет к объекту Request пользователя в свойство user
    req.user = user;
    // console.log(req.user)
    
    next();
  } catch (error) {
    next(createError(401, error.message));
  }
};

module.exports = auth;
