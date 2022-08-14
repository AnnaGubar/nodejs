### Работа с файлами 
`npm i multer`обрабатывает только *multipart/form-data*

multer-example -> index.html загрузка файла `type="file"`

`upload.single("cover")` - взять один файл (single) из поля "cover"
`upload.array("hello", 8)` - взять несколько файлов (максимально 8) из поля "hello"
`upload.fields([{"cover", 2},{"hello", 3},{"pic", 8}])` - взять несколько файлов из нескольких полей

`npm i cloudinary`

# auth-example добавление сохранения файлов
если человек не загрузил аватар нужно дать рандомный `npm i gravatar`

1. создание папок temp и public/avatars
2. app.js -> `app.use(express.static("public"))`
3. models/user.js добавляем поле `avatarURL` с настройками
4. controllers/auth/registration.js создание рандомного аватара
`const avatarURL = gravatar.url(email);`
5. routes/api/auth.js создаем новый маршрут `"/avatars"`
`router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.setAvatar));`
  - создаем новый маршрут `"/avatars"`
  - `upload.single("avatar")`
6. middlewares -> upload.js - считывает данные которые приходят в формате form-data и передают контроллеру на обработку
7. controllers/auth -> setAvatar.js заменяет рандомную аву на загруженную
  a) находим путь постоянного хранения авы
  b) находим путь временного хранения авы
  c) создаем путь авы в папке "avatars" (a+имя_авы)
  d) перемещаем
  e) путь авы для БД ("avatars"+имя_авы)
  f) перезаписываем путь авы в БД

файл *.gitkeep* сохраняет папку на гите


