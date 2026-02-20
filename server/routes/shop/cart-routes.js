const express = require("express");

const {
  addToCart,
  fetchCartItems,
  deleteCartItem,
  updateCartItemQty,
<<<<<<< HEAD
  clearCart,
=======
>>>>>>> 0af58a59d3f77ea0ed43e63857ac20f0a1e0d172
} = require("../../controllers/shop/cart-controller");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQty);
<<<<<<< HEAD

/*GCosmosWeb*/
router.delete("/clear/:userId", clearCart);
/*GCosmosWeb*/

=======
>>>>>>> 0af58a59d3f77ea0ed43e63857ac20f0a1e0d172
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;
