### Регестрация/Авторизация
_конспект_ https://drive.google.com/file/d/1ksRA6Au0Wy1IMKJ5zE0U4aIXABe4F-1x/view

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

6. в файле .env добавляем SECRET_KEY

7. в login.js 
- импортируем `jsonwebtoken`
- забираем `SECRET_KEY` из process.env
- дополняем логику контроллера
```
    const payload = {id: user._id};
    const token = jwt.sign(payload, SECRET_KEY, {expireIn: "1h"});
    res.json({token});
```

Чтобы сделать post  с токеном:
 - написать тело
 - Authorization -> Type Bearer Token -> Token -вставить полученный-

8. создаем папку middlewares -> файл auth.js

9. routes/api -> book.js импортировать `middlewares/auth` и добавить в метод post
Логика авторизации: 
  1) Взять из заголовков заголовок authorization.
  2) Проверить, что первое слово в заголовке - Bearer.
  2а) Если нет - вернуть 401 ошибку.
  3) Проверить, что второе слово в заголовке - токен, который мы шифровали, и он не истек.
  3а) Если нет - вернуть 401 ошибку.
  4) Найти в базе пользователя с id, закодированом в токене.
  4а) Если нет - вернуть 401 ошибку.
  5) Прикрепить к объекту Request пользователя в свойство user.

`router.post("/", auth, ctrlWrapper(ctrl.add));` теперь роут приватный

10. связываем авторизированного пользователя с его коллекцией книг 
 - models/book.js 
   `owner: {type: Schema.Types.ObjectId, ref: "user"};`

11. получаем ответ в зависимости от того кто спрашивает
 - controllers/books/add.js  
   ` const {id: owner} = req.user; const result = await Book.create({...req.body, owner});`

 - controllers/books/getAll.js  
   `const {id: owner} = req.user; const result = await Book.find({owner}, "-createdAt -updatedAt");`

12. поле owner и его id - не информативно для фронтенда, метод _populate_ позволяет взять любую необходимую инфу связанной коллекции
`.populate("owner", "name email");`

13. _current_ если у авториз. пользователя истек срок токена, нужно брать новый
 - routes/api/auth.js сперва проверить авторизацию, потом получение нового токена
   `router.get("/current",auth, ctrlWrapper(ctrl.getCurrent));`
 
 - controllers/auth -> getCurrent.js
   если пользователь не авториз. будет ошибка с auth(авторизация), если авториз. - getCurrent получит данные про пользователя с auth(авторизация)

14. _logout_ - удаление токена -> чтобы удалить, нужно сперва сохранить
 - models/user.js -> `token: { type: String }`

 - controllers/auth/login.js `await User.findByIdAndUpdate(user._id, {token})`

 - routes/api/auth.js -> чтобы разлогиниться нужно быть залогиненным
 `router.get("/logout", auth, ctrlWrapper(ctrl.logout));`

 - controllers/auth -> logout.js -> находим пользователя, обнуляем токен

15. _пагинация_ getAll.js
 - получаем параметры запроса - `const {page = 1, limit = 20} = req.query`
 - высчитываем с какой книги выдать результат - `const skip = (page - 1) * limit;`
 - добавляем к поиску доп. настройки`{skip, limit: Number(limit)}`