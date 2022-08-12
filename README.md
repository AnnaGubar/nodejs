### Регестрация/Авторизация


# Токен JWT-token `npm i jsonwebtoken`
*JWT.sign*: 
 - *Headers* - алгоритм и сложность шифрования
 - *Payload* - данные которые необходимо зашифровать
 - *SECRET_KEY* - с помощью чего шифровать (любая строка)

Токен состоит из трех частей разделенных точками:
 - закодированные заголовки
 - закодированный payload
 - зашифрованные данные с помощью секретного ключа (динамичен)


1. routes/api -> `auth.js` (отвечает за регистрацию/авторизацию) - создание роутинга 

2. в app.js указываем обрабатывание маршрута `authRouter`
```
const authRouter = require("./routes/api/auth"); 
app.use("/api/auth", authRouter);
```

3. в auth.js 
 - импортируем try-catch `ctrlWrapper` обертку и контроллеры `ctrl`
 - создаем роуты для регистрации `/register` и авторизации `/login`

4. controllers -> создаем папку auth 
 - `register.js` - хеширование пароля
 - `login.js` - создание токена
 - index.js - реекспорт

5. models -> создаем файл `user.js`
 - создание схемы userSchema
 - создание модели User
 - создание Joi-схем для валидации registerSchema, loginSchema


