const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { generateToken } = require("../utils/jwtToken"); //
const jwt = require("jsonwebtoken");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const user = await User.findOne({ email });

  console.log(user);
  console.log("Passowrd compare", await comparePassword(password, user.password));

  if (user && (await comparePassword(password, user.password))) {
    console.log("password matched");
    const token = generateToken({ id: user._id, email: user.email, username: user.name });

    console.log("Dedode token after createion", jwt.decode(token));

    return res.status(200).json({
      message: "Login Successfully",
      details: user,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }
  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      message: "Created user Successfully",
      details: user,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.send("Logout");
});

const currentUser = asyncHandler(async (req, res, next) => {
  // console.log(req);

  console.log(req.user.name);
  const id = req.user.id;
  const user = await User.findById(id);

  res.status(200).json({
    message: "Get current user",
    details: user,
  });
});
module.exports = { loginUser, registerUser, logoutUser, currentUser };
