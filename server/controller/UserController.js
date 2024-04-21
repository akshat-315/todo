const { CustomHttpError } = require("../middleware/ErrorHandler.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/User.js");

//Creating a user via sign-up
const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomHttpError(500, "User already exists");
  }

  try {
    if (!email || !password) {
      throw new CustomHttpError(500, "Please fill out all the fields");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      res.status(200).json("Sign-up was successful");
    } else {
      throw new CustomHttpError(500, "Some error occurred during sign-up");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
};
