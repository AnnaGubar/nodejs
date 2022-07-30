### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

### Файлы
`models/books.json` - данные
`models/index.js` - методы обработки данных
`app.js` - создание веб-сервера и работа с ним
`routes/api/books.js` - обработчики адресов запросов
`server.js` - запуск сервера
`helpers/createError.js` - 
`helpers/index.js` - 

`next(error);` - озн что обработчик будет искать следующий .use() где обрабатывается error, у нас это выполняется в файле app.js
```
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
```