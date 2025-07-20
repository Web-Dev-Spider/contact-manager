const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB connected: ${connection.connection.host} ${connection.connection.name}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
