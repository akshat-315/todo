const express = require("express");
const userRouter = require("./route/UserRoutes.js");
const cookieParser = require("cookie-parser");
const ErrorHandler = require("./middleware/ErrorHandler.js");
require("dotenv").config();
require("./database/db.js")();

//Declarations
const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cookieParser());

//Error Middleware
app.use(ErrorHandler);

//Routes
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log("Server is up and running on Port:", PORT);
});
