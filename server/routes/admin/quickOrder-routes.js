const express = require("express");
const {createQuickOrder , getAllQuickOrders, getQuickOrderDetails, updateQuickOrderStatus} = require("../../controllers/shop/quick-order-controller");

const router = express.Router();

router.post("/", createQuickOrder);
router.get("/", getAllQuickOrders); 
router.get("/:id", getQuickOrderDetails);
router.put("/:id", updateQuickOrderStatus);
module.exports = router;