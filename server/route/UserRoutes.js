const express = require("express");
const { signUp, signIn } = require("../controller/UserController");

const userRouter = express.Router();

userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", signIn);

module.exports = userRouter;
