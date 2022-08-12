// *** Хеширование ***

const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  // простое хеширование
  const result = await bcrypt.hash(password, 10);
  console.log("⭐ ~ result", result);

  // сложное хеширование (10 - усложненность алгоритма генерирования)
  const salt = await bcrypt.genSalt(10);
  console.log("⭐ ~ salt", salt);

  // метод compare проверяет "123456" равно ли result
  const compareResult = await bcrypt.compare("123456", result);
  console.log("⭐ ~ compareResult", compareResult); // true

  const compareResult2 = await bcrypt.compare("123457", result);
  console.log("⭐ ~ compareResult2", compareResult2); // false
};

hashPassword("123456");
