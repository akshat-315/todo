const Todo = require("../model/Todo");

//Create a todo
const createTodo = async (req, res, next) => {
  const { title, content, isImportant, userId } = req.body;

  try {
    if (!userId) {
      res.status(400);
      throw new Error("you are not authorized to create a new task");
    }

    if (!title) {
      res.status(400);
      throw new Error("Please give a title to your task");
    }

    const newTodo = new Todo({
      title,
      content,
      isImportant,
      userId,
    });

    const savedTodo = await newTodo.save();
    if (savedTodo) {
      res.status(200).json({
        savedTodo,
        message: "Todo created",
        status: "success",
      });
    } else {
      res.status(400);
      throw new Error("An error occurred while creating a todo");
    }
  } catch (error) {
    next(error);
  }
};

//Get all todos
const getTodos = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400);
    throw new Error("You are not signend in");
  }

  try {
    const allTodos = await Todo.find({ userId: userId });

    if (allTodos) {
      res.status(200).json({
        allTodos,
        message: "All todos fetched successfully",
        status: "success",
      });
    } else {
      res.status(400);
      throw new Error("Some error occurred while fetching the tasks");
    }
  } catch (error) {
    next(error);
  }
};

//update a todo
const updateTodo = async (req, res, next) => {
  const { todoId } = req.body;

  if (!todoId) {
    res.status(400);
    throw new Error("Cannot update todo");
  }

  try {
    const savedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          isImportant: req.body.isImportant,
          status: req.body.status,
        },
      },
      { new: true }
    );

    res.status(200).json({
      savedTodo,
      message: "Todo updated",
      status: "success",
    });
  } catch (error) {}
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
};
