const Todo = require("../model/Todo");

// Create a todo
const createTodo = async (req, res, next) => {
  const { title, content, userId } = req.body;

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

    const existingTodo = await Todo.findOne({ title });

    if (existingTodo) {
      return res.status(400).json({
        message: "A todo with this title already exists",
        success: "false",
      });
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
  const { title, content } = req.body;

  try {
    if (!todoId) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        $set: {
          title: title,
          content: content,
        },
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      updatedTodo,
      message: "Todo updated",
    });
  } catch (error) {
    next(error);
  }
};

const markAsImportant = async (req, res, next) => {
  const { todoId } = req.params;
  const { isImportant } = req.body;

  try {
    if (!todoId) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        $set: {
          isImportant: isImportant,
        },
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      updatedTodo,
      message: "Todo updated",
    });
  } catch (error) {
    next(error);
  }
};
const setStatus = async (req, res, next) => {
  const { todoId } = req.params;
  const { status } = req.body;

  try {
    if (!todoId) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        $set: {
          status: status,
        },
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      updatedTodo,
      message: "Todo updated",
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

//Fetch a todo according to its status
const fetchTodoStatus = async (req, res, next) => {
  const { userId } = req.params;
  const { status } = req.query;

  if (!userId || !status) {
    return res.status(400).json({
      message: "Incomplete information in the req params",
      status: "fail",
    });
  }

  try {
    const todos = await Todo.find({ userId, status });

    if (!todos) {
      return res.status(400).json({
        message: "Some error occurred while fetching the todos with status",
      });
    }

    res.status(200).json({
      todos,
      message: "Todos with status fetched successfully",
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
  markAsImportant,
  setStatus,
  fetchTodoStatus,
};
