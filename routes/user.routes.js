const { registerUser, logoutUser, loginUser, currentUser } = require("../controllers/user.controller");
const validateToken = require("../middlewares/validateTokenHandler");

const userRoutes = require("express").Router();

userRoutes.post("/login", loginUser);

userRoutes.post("/register", registerUser);
userRoutes.get("/current", validateToken, currentUser);

userRoutes.post("/logout", logoutUser);

module.exports = userRoutes;
