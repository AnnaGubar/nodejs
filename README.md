[Какие бывают варианты размещения сайта на хостинге](./slides/deploy-variants.jpg)

[Как разместить сайт на одном сервере](./slides/variants-deploy-all-in-one.jpg)

[Структура бекенда](./slides/backend-structure.jpg)

[Какие типы баз данных бывают](./slides/database-types.jpg)

[Почему noSQL базы называают документоориентированными](./slides/documents-database-schema.jpg)

[Какие типы баз данных бывают](./slides/database-types.jpg)

[Почему нужно использовать удаленную базу данных](./slides/remote-database.jpg)

[Как работает пакет dotenv](./slides/dotenv-work-schema.jpg)

[Как работает бекенд с Google таблицами](./slides/woork-with-google-sheets.jpg)

[Пример структуры 'схема-модель-коллекция' в жизни](./slides/schema-model-example.jpg)

[Схема-Модель-коллекцция в MongoDB](./slides/schema-model-collection.jpg)

[Как обрабатывается ошибка не найденного маршрута в Express](./slides/express-middleware-not-found-shema.jpg)

[Как Express обрабатывает ошибку, переданную в next](./slides/express-error-handler.jpg)

_конспект_ https://drive.google.com/file/d/1MibBv7-Hhvrlq3RY7H_9HvPQ3jo_6VNI/view

1. создание коллекции в БД:
- _MongoDB_ -> new project -> Database Access (сохранить пароль) -> Network Access (anywhere) -> Database (build)

2. _mongodb compass_ установить на комп

3. ссылка для mongodb compass:
- database -> connect -> ...open compass -> copy string (вставить сохраненный пароль)

4. `npm i mongoose` - подключиться к базе данных

5. ссылка на подключение:
- MongoDB -> database -> connect -> connect app -> copy string (вставить сохраненный пароль)

6. mongodb-project -> app.js -> `mongoose.connect(ссылка на подключение)`

7. приячем пароль:
 - `npm i dotenv`
 - создать в корне папки файл .env (записать пароль) и добавить в .gitignore
 - app.js -> `require("dotenv").config(); const {DB_HOST} = process.env;`

8. для девопсов создать файл .env.example с перечнем переменных (DB_HOST=)
