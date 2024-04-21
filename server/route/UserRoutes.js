const express = require("express");
const { signUp } = require("../controller/UserController");

const userRouter = express.Router();

userRouter.post("/sign-up", signUp);

module.exports = userRouter;
