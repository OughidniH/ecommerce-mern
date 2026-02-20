const express = require("express");
const { dbConnect } = require("./utiles/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
<<<<<<< HEAD
/*GCosmosWeb*/
const adminCategoryRouter = require("./routes/admin/category-routes");
/*GCosmosWeb*/
=======

>>>>>>> 0af58a59d3f77ea0ed43e63857ac20f0a1e0d172
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
<<<<<<< HEAD
const commonFeatureRouter = require("./routes/common/feature-routes");
/*GCosmosWeb*/
const bodyParser = require('body-parser');
/*GCosmosWeb*/
require("dotenv").config();
const app = express();
/*GCosmosWeb*/
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded())
// // parse application/json
// app.use(bodyParser.json())
/*GCosmosWeb*/

const PORT = process.env.PORT || 5002;
=======

const commonFeatureRouter = require("./routes/common/feature-routes");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5001;
>>>>>>> 0af58a59d3f77ea0ed43e63857ac20f0a1e0d172

dbConnect();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
<<<<<<< HEAD
/*GCosmosWeb*/
app.use("/api/admin/category", adminCategoryRouter);
/*GCosmosWeb*/
=======

>>>>>>> 0af58a59d3f77ea0ed43e63857ac20f0a1e0d172
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
<<<<<<< HEAD
=======

>>>>>>> 0af58a59d3f77ea0ed43e63857ac20f0a1e0d172
app.use("/api/common/feature", commonFeatureRouter);
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
