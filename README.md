[Схема взаимодействия клиента и сервера](./slides/Client-Server-schema.jpg)

[Как работают middleware в express](./slides/middleware-work-schema.jpg)

[Как работают middleware в express](./slides/middleware-work-schema.jpg)

[Более подробно - как работают middleware в express](./slides/middleware-work-schema-details.jpg)

[Middleware в express как оглавление записной книжки](./slides/middleware-work-schema-details-2.jpg)

[Middleware в express как набор обязательных действий на ресепшен](./slides/middleware-work-schema-details-3.jpg)

[Что такое CORS - кросс-доменные запросы](./slides/what-is-it-cors.jpg)

[Проблемы с CORS при разработки одновремено фронтенда и бекенда](./slides/fullstack-developer-cors-problem.jpg)

[Проблемы с CORS когда бекенд задеплоен на удаленный сервер](./slides/fullstack-developer-cors-problem-2.jpg)

_Конспект_ https://drive.google.com/file/d/1MBzcy2dQqwT7QQC_kj0QmMkegXXezoBr/view

### Пакеты для установки
`npm i express`
`npm i moment`
`npm i cors`
`npm i uuid`

- При добавлении/обновлении сущности нужно возвращать добавленный в БД объект с id.
- Фронтенд должен ориентироваться не на данные в ответе, а на код статуса ответа.
- Express требует указания в каком формате приходит тело запроса (POST) - `app.use(express.json())`

200-299 - обработка ответа прошла успешно
  200 - успешная обработка
  201 - успешно создан (в ответ на POST-запрос)
  204 - No Content (нет содержимого) - успешный DELETE-запрос

300-399 - ошибка переадресации
  301 - адрес изменён на другой на постоянной основе
  302 - адрес изменён на другой временно

400-499 - ошибки запроса
  400 - Bad Request - в запросе что-то неправильно
  401 - не аутентифицирован
  403 - не хватает прав
  404 - такого не существует (либо адреса, либо id)

500-599 - ошибка сервера
