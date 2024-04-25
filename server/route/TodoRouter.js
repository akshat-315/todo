const express = require("express");
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  markAsImportant,
  setStatus,
  fetchTodoStatus,
} = require("../controller/TodoController");

const todoRouter = express.Router();

todoRouter.post("/create-todo", createTodo);
todoRouter.get("/get-todos/:userId", getTodos);
todoRouter.put("/update-todo/:todoId", updateTodo);
todoRouter.put("/update-important/:todoId", markAsImportant);
todoRouter.put("/update-status/:todoId", setStatus);
todoRouter.delete("/delete-todo/:todoId", deleteTodo);
todoRouter.get("/fetch-todo/:userId", fetchTodoStatus);

module.exports = todoRouter;
