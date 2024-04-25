const mongoose = require('mongoose');

//The user schema will have the following attributes
// which will the be created in the mongodb database

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
