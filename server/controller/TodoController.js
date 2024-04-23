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
      res.status(200).json("New Todo created!");
    } else {
      res.status(400);
      throw new Error("An error occurred while creating a todo");
    }
  } catch (error) {
    next(error);
  }
};

//Update a todo
// const updateTodo = async (req, res, next) => {
//   const { todoId } = req.params;
//   const { title, content, status, isImportant } = req.body;

//   try {
//     const existingTodo = await Todo.findOne({ userId });
//     if (!existingTodo) {
//       res.status(400);
//       throw new Error("Todo doesnt exist");
//     }

//     if (!title) {
//       res.status(400);
//       throw new Error("Kindly fill in the title");
//     }

//     const
//   } catch (error) {}
// };

module.exports = {
  createTodo,
};
