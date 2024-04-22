const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/User.js");

//Creating a user via Sign-Up
const signUp = async (req, res, next) => {
  const { email, password, username } = req.body;

  try {
    if (!email || !password || !username) {
      res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
      return;
    }

    //checking if user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      res.status(200).json("Sign-up was successful");
    } else {
      res.status(500).json({ success: false, message: "Some error occurred" });
      return;
    }
  } catch (error) {
    next(error);
  }
};

//User Sign-In
const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //Checking if user if valid or not
    const validUser = await User.findOne({ email });
    if (!validUser) {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
      return;
    }

    //Matching hashed the password from the database
    const isMatch = await bcrypt.compare(password, validUser.password);
    if (!isMatch) {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
      return;
    }

    //Generating token using jwt
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    //set the token into cookie
    res.cookie("token", token, {
      httpOnly: true,
    });

    console.log("Token: ", token);
    //send the response
    res.status(200).json({
      status: "success",
      message: "Login success",
      _id: validUser?._id,
      email: validUser?.email,
      username: validUser?.username,
    });
  } catch (error) {
    next(error);
  }
};

// const getUser = async (req, res, next) => {
//   const { email } = req.body;

//   try {
//     const user = await User.find({ email });
//     if (!user) {
//       res.json(500).json({ success: "false", message: "Invalid user" });
//       return;
//     }

//     res.status(200).json({
//       user,
//       success: "true",
//       message: "User found",
//     });
//   } catch (error) {}
// };

//SignOut
const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json({
      status: "success",
      message: "Sign-out success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
};
