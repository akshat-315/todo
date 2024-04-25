const express = require('express');
const userRouter = require('./route/UserRoutes.js');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/ErrorHandler.js');
const todoRouter = require('./route/TodoRouter.js');
require('dotenv').config();
require('./database/db.js')();

//Declarations
const app = express();
//Can declare your own port in the .env file
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cookieParser());

//Routes that the server requires, a user route and a todo route
app.use('/api/user', userRouter);
app.use('/api/todo', todoRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log('Server is up and running on Port:', PORT);
});
