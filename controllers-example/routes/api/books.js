const express = require("express");
const ctrl = require(`../../controllers/books`);// контроллеры
const {ctrlWrapper} = require('../../helpers'); 
// const {basedir} = global; // путь к app.js
// const ctrl = require(`${basedir}/controllers/books`); 
// const {ctrlWrapper} = require(`${basedir}/helpers`); 
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:id", ctrlWrapper(ctrl.getById));
router.post("/", ctrlWrapper(ctrl.add));
router.put("/:id", ctrlWrapper(ctrl.updateById));
router.patch("/:id/favorite", ctrlWrapper(ctrl.updateFavorite));
router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;