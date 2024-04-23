const express = require("express");
const { createTodo } = require("../controller/TodoController");

const todoRouter = express.Router();

todoRouter.post("/create-todo", createTodo);

module.exports = todoRouter;
