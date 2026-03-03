const mongoose = require("mongoose");

const QuickOrderSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productTitle: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
   subtotal: {
    type: Number,
    required: true,
  },
  deliveryPrice: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  wilaya: {
    type: String,
    required: true,
  },
  commune: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("QuickOrder", QuickOrderSchema);