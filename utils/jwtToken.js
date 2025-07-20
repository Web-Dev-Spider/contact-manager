const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const generateToken = (user) => {
  const { id, email, username } = user;
  return jwt.sign({ id, email, username }, process.env.JWT_SECRET, { expiresIn: "10m" });
};

module.exports = { generateToken };
