const express = require("express");
const router = express.Router();

const books = require("../../models"); // методы
const { createError } = require("../../helpers"); // генерация ошибок

const Joi = require("joi"); // валидация POST/PUT
const bookAddSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await books.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    // console.log(req.params); // { id: 'u9kgwNWGi3uUUwh0b8V49' }

    const { id } = req.params;
    const result = await books.getById(id);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    // console.log(req.body);

    // если валидация выдает ошибку - прокинуть ее дальше
    const { error } = bookAddSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }

    // если валидация пройдена успешно - выдать результат
    const result = await books.add(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    // валидация введенных данных
    const { error } = bookAddSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }

    // поиск по id в books.json
    const { id } = req.params;

    // обновление
    const result = await books.updateById(id, req.body);
    if (!result) {
      throw createError(404);
    }

    // выдать результат
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async(req, res, next) => {
    try {
        const {id} = req.params;
        const result = await books.removeById(id);
        if(!result){
            throw createError(404)
        }
        // res.status(204).send()
        res.json({
            message: "Book deleted"
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;
