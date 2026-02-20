const express = require("express");

const {
  /*GCosmosWeb*/
  createOrder,
  /*GCosmosWeb*/ 
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/order-controller");

const router = express.Router();

/*GCosmosWeb*/
router.post("/create", createOrder);
/*GCosmosWeb*/

router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);

module.exports = router;
