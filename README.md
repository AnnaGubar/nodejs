### Работа с email `npm i @sendgrid/mail`

*папка sendgrid*
1. Регистрация на `sendgrid.com` (важно сгенерировать api key и сохранить его) Settings -> API Keys
2. Верифицировать адрес отправителя Settings -> Sender Authentication
3. app.js - общая реализация sendgrid
4. helpers -> sendEmail - для многоразоваого использования

*папка nodemailer* `npm i nodemailer` - почтовый сервер
1. app.js - необходимо настроить хост (meta.ua)
  - регистрация
  - сохранить пароль в файле .env как META_PASSWORD
  - meta.ua -> Налаштування -> Налаштування POP3/SMTP сервера -> Дозволити доступ за протоколом POP3/SMTP

Ошибку "Error: Message failed: 550 Suspicion of spam" не решаем.

*папка auth-example*
1. helpers -> sendEmail.js
2. models/user - добавляем два поля
  - `verify` - после регистрации (человек еще не подтвердил свою почту)
  - `verificationToken` - то что отправляем на почту пользователю
3. controllers/auth/register.js `npm i nanoid@3.3.4`
  - импортируем sendEmail
  - создаем verificationToken `const verificationToken = nanoid();`
  - добавляем в запрос `User.create` к БД 
  - создаем `email` для отправки при регистрации
  - отправление созданного письма `await sendEmail(mail);`
5. controllers/auth -> `verifyEmail.js` - обработчик верификации почты
6. создаем путь для верификации почты `"/verify/:verificationToken"` и добавляем `ctrl.verifyEmail`
7. controllers/auth/login.js -> мы не должны выдавать токен если пользователь не подтвердил почту ( не пройдена verifyEmail.js) `if(!user.verify){createError(401, "Email not verify")}`
8. создаем путь для возможности повторно отправить письмо для верификации `"/verify"`+ `ctrl.resendVerifyEmail`
9. controllers/auth -> `resendVerifyEmail.js` 
10. models/user -> создаем схему для валидации почты 
`const emailSchema = Joi.object({email: Joi.string().pattern(emailRegexp).required()})`



