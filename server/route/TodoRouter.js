const express = require("express");
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controller/TodoController");

const todoRouter = express.Router();

todoRouter.post("/create-todo", createTodo);
todoRouter.get("/get-todos/:userId", getTodos);
todoRouter.put("/update-todo/:todoId", updateTodo);
todoRouter.delete("/delete-todo/:todoId", deleteTodo);

module.exports = todoRouter;
