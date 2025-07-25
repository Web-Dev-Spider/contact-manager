const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Unauthorized");
      }
      req.user = decoded;
      //   console.log("Decoded", req.user);
      next();
    });
  } else {
    res.status(401);
    throw new Error("Unauthorized");
  }
});

module.exports = validateToken;
