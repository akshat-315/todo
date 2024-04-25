const mongoose = require('mongoose');

//The todo schema will have the following attributes
// which will the be created in the mongodb database

const todoSchema = new mongoose.Schema(
    {
        //Its necessary to assign a userId with a specific todo in order to know which task has been created by which user
        userId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            unique: true
        },
        content: {
            type: String
        },
        status: {
            type: String,
            required: true,
            default: 'active'
        },
        isImportant: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
