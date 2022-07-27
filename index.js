const fs = require("fs").promises;

//* управление содержимым файла - node index

fs.writeFile("text.txt", 'writeFile перезаписывает все содержимое файла. ');

fs.appendFile("text.txt", 'appendFile добавляет к уже существующему. ');

fs.appendFile("text.txt", 'Добавление текста.');

fs.readFile("text.txt")
  .then((data) => console.log(data.toString()))
  .catch(console.log);

// fs.rename(oldPath, newPath) - переименование файла.
// fs.unlink(path, callback) - удаление файла.

//* создание таблицы содержимого папки nodejs - node index

fs.readdir(__dirname)
.then(files => {
  return Promise.all(
    files.map(async filename => {
      const stats = await fs.stat(filename);
      return {
        Name: filename,
        Size: stats.size,
        Date: stats.mtime,
      };
    }),
  );
})
.then(result => console.table(result));




