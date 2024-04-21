const Todo = require("../model/Todo");

//Create a todo
const createTodo = async (req, res, next) => {
  const { title, content } = req.body;

  try {
    if (!title) {
      res.status(400);
      throw new Error("Please give a title to your task");
    }

    const newTodo = new Todo({
      title,
      content,
    });

    const savedTodo = await newTodo.save();
    if (savedTodo) {
      res.status(200).json("New Todo created!");
    } else {
      res.status(400);
      throw new Error("An error occurred while creating a todo");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
};
