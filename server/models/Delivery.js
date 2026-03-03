const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const DeliverySchema = new Schema({

  wilaya: { type: String, required: true },
  homePrice: { type: Number, required: true },    
  officePrice: { type: Number, required: true }, 
  communes: { type: [String], default: [] },
});

module.exports =  model("delivery", DeliverySchema);
