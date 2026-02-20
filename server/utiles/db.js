const mongoose = require("mongoose");
mongoose.set("debug", true);
module.exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
<<<<<<< HEAD
=======
      useNewUrlParser: true,
      useUnifiedTopology: true, // Add this option as well
      serverSelectionTimeoutMS: 5000, // Optional: Limits how long mongoose will wait for MongoDB to respond (in milliseconds)
>>>>>>> 0af58a59d3f77ea0ed43e63857ac20f0a1e0d172
    });
    console.log("Database connected....");
  } catch (error) {
    console.log("Error connecting to the database: ", error.message);
  }
};
