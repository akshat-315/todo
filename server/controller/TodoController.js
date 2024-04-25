const Todo = require('../model/Todo');

// Create a todo, takes title, content and a userId related to user creating a task, from the req body.
const createTodo = async (req, res, next) => {
    const { title, content, userId } = req.body;

    try {
        //Checks that if the userId is not present, the server will respond with a status of 400(the req sent by the user didnt follow the rules, thus a BAD Request)
        if (!userId) {
            return res.status(400).json({
                message: 'You are not authorized to create a new task'
            });
        }

        if (!title) {
            return res
                .status(400)
                .json({ message: 'Please give a title to your task' });
        }

        //Checks if the title is already present in the database, then there is no need to create a new todo with the same title
        const existingTodo = await Todo.findOne({ title });

        if (existingTodo) {
            return res.status(400).json({
                message: 'A todo with this title already exists',
                success: 'false'
            });
        }

        const newTodo = new Todo({
            title,
            content,
            userId
        });

        const savedTodo = await newTodo.save();
        res.status(201).json({
            savedTodo,
            message: 'Todo created',
            status: 'success'
        });
    } catch (error) {
        next(error);
    }
};

// Fetching all todos from the database, the req body will have a userId and finds all the todos created by that user
const getTodos = async (req, res, next) => {
    const { userId } = req.params;

    try {
        if (!userId) {
            return res.status(400).json({ message: 'You are not signed in' });
        }

        const allTodos = await Todo.find({ userId });

        res.status(200).json({
            allTodos,
            message: 'All todos fetched successfully',
            status: 'success'
        });
    } catch (error) {
        next(error);
    }
};

// Updates a todo. The req body will have a title and content that is to be updated and will have the todoId in the params.
const updateTodo = async (req, res, next) => {
    const { todoId } = req.params;
    const { title, content } = req.body;

    try {
        if (!todoId) {
            return res.status(400).json({ message: 'Todo ID is required' });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            {
                $set: {
                    title: title,
                    content: content
                }
            },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({
            updatedTodo,
            message: 'Todo updated'
        });
    } catch (error) {
        next(error);
    }
};

//Marks the todo as important or not. Didnt required to be created as a whole new function, can be integrated with the updateTodo function above.
const markAsImportant = async (req, res, next) => {
    const { todoId } = req.params;
    const { isImportant } = req.body;

    try {
        if (!todoId) {
            return res.status(400).json({ message: 'Todo ID is required' });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            {
                $set: {
                    isImportant: isImportant
                }
            },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({
            updatedTodo,
            message: 'Todo updated'
        });
    } catch (error) {
        next(error);
    }
};

//Sets the status of a todo as active or completed. Again, a new function is not needed and can be integrated with the updateTodo function above
const setStatus = async (req, res, next) => {
    const { todoId } = req.params;
    const { status } = req.body;

    try {
        if (!todoId) {
            return res.status(400).json({ message: 'Todo ID is required' });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            {
                $set: {
                    status: status
                }
            },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({
            updatedTodo,
            message: 'Todo updated'
        });
    } catch (error) {
        next(error);
    }
};

// Deletes a todo. The params will have the todoId and the function will search for the specific todo in the database and deletes it.
const deleteTodo = async (req, res, next) => {
    const { todoId } = req.params;

    try {
        if (!todoId) {
            return res.status(400).json({ message: 'Todo ID is required' });
        }

        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({
            message: 'Todo deleted',
            status: 'success'
        });
    } catch (error) {
        next(error);
    }
};

//Fetches a todo according to its status, will have a userId in the params and status in the query of the request.
const fetchTodoStatus = async (req, res, next) => {
    const { userId } = req.params;
    const { status } = req.query;

    if (!userId || !status) {
        return res.status(400).json({
            message: 'Incomplete information in the req params',
            status: 'fail'
        });
    }

    try {
        const todos = await Todo.find({ userId, status });

        if (!todos) {
            return res.status(400).json({
                message:
                    'Some error occurred while fetching the todos with status'
            });
        }

        res.status(200).json({
            todos,
            message: 'Todos with status fetched successfully',
            status: 'success'
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
    fetchTodoStatus
};
