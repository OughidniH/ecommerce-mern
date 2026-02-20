const express = require("express");

const {
<<<<<<< HEAD
  /*GCosmosWeb*/
  createOrder,
  /*GCosmosWeb*/ 
=======
>>>>>>> 0af58a59d3f77ea0ed43e63857ac20f0a1e0d172
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/order-controller");

const router = express.Router();

<<<<<<< HEAD
/*GCosmosWeb*/
router.post("/create", createOrder);
/*GCosmosWeb*/

=======
>>>>>>> 0af58a59d3f77ea0ed43e63857ac20f0a1e0d172
router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);

module.exports = router;
