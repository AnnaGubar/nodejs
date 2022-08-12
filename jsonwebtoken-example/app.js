const jwt = require("jsonwebtoken");
require("dotenv").config(); 

const {SECRET_KEY} = process.env;

const payload = {
    id: "62f66af782e563f5277beb8a"
};

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
// console.log(token);


const decodeToken = jwt.decode(token);
// console.log(decodeToken); 

// метод verify проверяет была ли третья часть токена закодирована с помощью SECRET_KEY
try {
    const result1 = jwt.verify(token, SECRET_KEY);
    console.log(result1); // получаем payload 

    const result2 = jwt.verify(`${token}22`, SECRET_KEY);
    console.log(result2); // ошибка - invalid signature
} catch (error) {
    console.log(error.message);
}

