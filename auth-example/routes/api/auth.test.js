const mongoose = require("mongoose");
const request = require("supertest"); // имитирует запрос к БД
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");

const { DB_TEST_HOST, PORT } = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT))); // запускает веб-сервер перед всеми тестами
  afterAll(() => server.close()); //закрывает после всех тестов

  // выполняется перед каждым тестом
  // подключается к БД перед каждым тестом
  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  // выполняется после каждого теста
  // удаляет коллекцию с пользователя
  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  // создаем нового пользователя
  test("test login route", async () => {
    const newUser = {
      email: "bogdan@gmail.com",
      password: "123456",
    };

    // сохраняем в БД
    const user = await User.create(newUser);

    /*
        1. Проверить правильность получаемого ответа на 
        AJAX-запрос документации
        2. Проверить что в базу записался нужный элемент.
        */

    const loginUser = {
      email: "bogdan@gmail.com",
      password: "123456",
    };

    
    const response = await request(app).post("/api/auth/login").send(loginUser);// логинимся
    expect(response.statusCode).toBe(200);// получаем ответ
    
    const { body } = response;
    expect(body.token).toByTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
  });
});
