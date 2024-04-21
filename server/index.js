const express = require("express");
require("dotenv").config();
require("./database/db.js")();

const app = express();

app.listen(9000, () => {
  console.log("Server is up and running");
});
