const Todo = require("../model/Todo");

// Create a todo
const createTodo = async (req, res, next) => {
  const { title, content, isImportant, userId } = req.body;

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ message: "You are not authorized to create a new task" });
    }

    if (!title) {
      return res
        .status(400)
        .json({ message: "Please give a title to your task" });
    }

    const newTodo = new Todo({
      title,
      content,
      userId,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json({
      savedTodo,
      message: "Todo created",
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

// Get all todos
const getTodos = async (req, res, next) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ message: "You are not signed in" });
    }

    const allTodos = await Todo.find({ userId });

    res.status(200).json({
      allTodos,
      message: "All todos fetched successfully",
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

// Update a todo
const updateTodo = async (req, res, next) => {
  const { todoId } = req.params;

  try {
    if (!todoId) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        $set: req.body, // Update all fields in the request body
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      updatedTodo,
      message: "Todo updated",
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

// Delete a todo
const deleteTodo = async (req, res, next) => {
  const { todoId } = req.params;

  try {
    if (!todoId) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo deleted",
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
