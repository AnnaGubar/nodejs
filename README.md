[Где используется работа с файлами в Node.js](./slides/work-with-files-examples.png)

Если в папке главный js-файл назван "index" - достаточно указать папку
`const productsOperations = require("./methods");`
Если в папке главный js-файл назван как-то иначе - прописываем папка/файл
`const productsOperations = require("./methods/methods");`

_Самовызывающаяся функция_
`(async () => { await invokeAction(argv)})();`

_Абсолютный путь к папке_
`console.log(__dirname)`

_Абсолютный путь к файлу_
`const path = require("path");
 const filePath = path.join(__dirname, "имя_файла");`

При работе с текстовым файлом достаточно указывать кодировку _"utf-8"_, но при работе с json-файлом нужно использовать метод _JSON.parse_(data)

### папка json
- `products.json` - data
- `index.js` - Api (вызов методов)
- `file-path.js` - доступ к данным products.json
- папка `methods` - логика методов
  - `methods.js` - собираем все методы в один файл

⌨ `node json`
Последовательность работы файлов:
первыми получаем 1. и 2. из-за выполнения команд require
1. methods/methods.js - require()
2. file-path.js - require()
3. index.js - вызов метода
4. _getAll.js - метод