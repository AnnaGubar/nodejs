//* npm i colors
//* npm i commander

//* ⌨ node colors

const fs = require("fs").promises;
require("colors");

// отрывок кода для создания интерфейса командной строки
const { program } = require("commander");

program.option(
  "-f, --file [type]", // определяем запуск программы - node game.js -f my_log.txt
  "file for saving game results",
  "colors/results.txt" // куда сохранять результат
);

program.parse(process.argv);
// ---

// инициализация модуля readline
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin, // ввод из стандартного потока
  output: process.stdout, // вывод в стандартный поток
});

let count = 0; // подсчет количества попыток которые понадобились, чтобы угадать число
const logFile = program.opts().file; // имя файла куда будут сохранены результаты игры
const mind = Math.floor(Math.random() * 10) + 1; // это случайное число от 1 до 10, которое необходимо отгадать

// валидация введенных значений в консоли (только число от 1 до 10)
const isValid = (value) => {
  // введенно число?
  if (isNaN(value)) {
    console.log("Введите число!".red);
    return false;
  }

  // введенно число от 1 до 10 ?
  if (value < 1 || value > 10) {
    console.log("Число должно быть в диапазоне 1 до 10".red);
    return false;
  }

  return true;
};

// сохранение результатов игры
const log = async (data) => {
  try {
    // сохранять          куда      что
    await fs.appendFile(logFile, `${data}\n`);
    console.log(`Удалось сохранить результат в файл ${logFile}`.green);
  } catch (err) {
    console.log(`Не удалось сохранить файл ${logFile}`.red);
  }
};

const game = () => {
  // метод прослушивающий консоль
  rl.question(
    "Введите число от 1 до 10, чтобы угадать задуманное: ".yellow,

    // - валидация введенного значения
    (value) => {
      // получаем введенное значение
      let a = +value; // приводим к числу
      if (!isValid(a)) {
        // валидируем методом isValid
        game(); // если не валидно то запускаем метод консоли rl.question снова
        return;
      }
      // число валидно - подсчитываем число введенных валидных чисел
      count += 1;

      // mind - раннее созданное рандомное число
      if (a === mind) {
        console.log("Поздравляю Вы угадали число за %d шага(ов)".green, count);
        log(
          `${new Date().toLocaleDateString()}: Поздравляю Вы угадали число за ${count} шага(ов)`
        ).finally(() => rl.close()); // закрываем консоль
        return;
      }

      console.log("Вы не угадали еще попытка".red);
      game();
    }
  );
};

game();


