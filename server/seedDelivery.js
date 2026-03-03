const mongoose = require("mongoose");
const Delivery = require("./models/Delivery");
const deliveryData = require("./delivery.json");

mongoose.connect("mongodb+srv://oughidnih_db_user:c9kGPWCiupt74XY@ecommerceproject.4h0sxs0.mongodb.net/")
  .then(async () => {
    console.log("MongoDB Connected");

    await Delivery.deleteMany();
    console.log("Old deliveries removed");

    await Delivery.insertMany(deliveryData);
    console.log("Delivery data inserted successfully");

    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
  });