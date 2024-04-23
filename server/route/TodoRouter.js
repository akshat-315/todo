const express = require("express");
const {
  createTodo,
  getTodos,
  updateTodo,
} = require("../controller/TodoController");

const todoRouter = express.Router();

todoRouter.post("/create-todo", createTodo);
todoRouter.get("/get-todos/:userId", getTodos);
todoRouter.put("/update-todo", updateTodo);

module.exports = todoRouter;
