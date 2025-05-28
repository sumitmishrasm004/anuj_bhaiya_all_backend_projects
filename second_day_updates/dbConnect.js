const mongoose = require("mongoose");
const User = require("./models/User");

module.exports = () => {
  const mongoUri =
    "mongodb+srv://sumitmishra:sumitmishra@cluster0.11ikk.mongodb.net/?retryWrites=true&w=majority";

  try {
    mongoose.connect(
      mongoUri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("mongoDB connected");
      }
    );
  } catch (error) {
    console.log("error:", error);
  }
};
