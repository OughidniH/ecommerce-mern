const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const CategorySchema = new Schema(
  {
    image: String,
    nameCat: {  type: String, required: true},
  },
  { timestamps: true }
);

module.exports =  model("category", CategorySchema);