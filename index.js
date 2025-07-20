const express = require("express");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 3000;

const contactRoute = require("./routes/contacts.routes");
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middlewares/errorHandler");
const { connect } = require("mongoose");
const connectToDB = require("./config/db");

const app = express();

app.use(express.json());

app.use("/api/contacts", contactRoute);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
  connectToDB();
});
