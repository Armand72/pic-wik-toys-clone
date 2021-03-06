const mongoose = require("mongoose");

require("dotenv").config();

const DB =
  process.env.NODE_ENV === "test" ? process.env.DB_TEST : process.env.DB;

const connectDB_APP = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB_APP;
