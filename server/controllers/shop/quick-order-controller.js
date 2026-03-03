const QuickOrder =require("../../models/Quick-order");
const Product = require("../../models/Product");

const DELIVERY_PRICE = 600;

const createQuickOrder = async (req, res) => {
   try {
    const { productId, fullName, phone, wilaya, commune, quantity } = req.body;

    const product = await Product.findById(productId);
    // console.log(product);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const qty = Number(quantity) || 1;
    const subtotal = product.price * qty;
    const totalPrice = subtotal + DELIVERY_PRICE;


    const newOrder = new QuickOrder({
      productId,
      productTitle: product.title,
      price: product.price,
      quantity: qty,
      subtotal,
      deliveryPrice: DELIVERY_PRICE,
      totalPrice,
      fullName,
      phone,
      wilaya,
      commune,
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Public Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getAllQuickOrders = async (req, res) => {
  try {
    const orders = await QuickOrder.find().sort({ createdAt: -1 }); // les plus récents en premier
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Get Quick Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getQuickOrderDetails = async (req, res) => {
  try {
    const order = await QuickOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Quick order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateQuickOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await QuickOrder.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Quick order status updated",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
module.exports = { createQuickOrder, getAllQuickOrders, getQuickOrderDetails, updateQuickOrderStatus };