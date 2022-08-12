### Регестрация/Авторизация

[Как HTTP-протокол общается с бекендом](./slides/HTTP-common-schema.jpg)
[Когда ответ на HTTP-запрос должен быть персонализированным](./slides/HTTP-personal-request-schema.jpg)
[Как сделать ответ на HTTP-запрос персонализированным и не логинится при каждом запросе](./slides/frontend-backend-requests-with-token.jpg)
[Разница между регистрацией, аутентификацией и авторизацией](./slides/register-auth-steps.jpg)
[Этапы создания модуля регистрации-аутентфикации-авторизации](./slides/reigster-auth-create-steps.jpg)
[Разница между хэшем и шифрованием](./slides/hash-schema.jpg)
[Работа с переменными окружения на локальном хосте и на удаленном сервере](./slides/process.env-and-deploy.jpg)

_конспект_ https://drive.google.com/file/d/12ZB4gAHYHF_H9MHiaU7pdNG3lMsekIdx/view
(методы схемы: setPassword - хеширование пароля, comparePassword - сравнение паролей)
(работа с "http-errors" - генерация ошибок)

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


 *ошибка 409* - "конфликт" или "уже существует"

 *bcrypt* работает только с последней стабильной версией Nodejs либо более ранней.
 Если версия Nodejs не известна - используй *bcryptjs*
