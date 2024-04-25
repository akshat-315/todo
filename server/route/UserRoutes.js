const express = require('express');
const { signUp, signIn, signOut } = require('../controller/UserController');

const userRouter = express.Router();

// These are routes that sets up the necessary tasks to perform on the User model

userRouter.post('/sign-up', signUp);
userRouter.post('/sign-in', signIn);
userRouter.post('/sign-out', signOut);

module.exports = userRouter;
