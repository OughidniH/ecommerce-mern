const mongoose = require("mongoose");
mongoose.set("debug", true);
module.exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
    });
    console.log("Database connected....");
  } catch (error) {
    console.log("Error connecting to the database: ", error.message);
  }
};
