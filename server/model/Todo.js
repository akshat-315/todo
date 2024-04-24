const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      default: "active",
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
