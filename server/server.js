const express = require("express");
const { dbConnect } = require("./utiles/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
/*GCosmosWeb*/
const adminCategoryRouter = require("./routes/admin/category-routes");
const quickOrderRoutes = require("./routes/admin/quickOrder-routes");
const deliveryRoutes = require("./routes/shop/delivery-routes")
/*GCosmosWeb*/
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");

require("dotenv").config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5002;

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
/*GCosmosWeb*/
app.use("/api/admin/category", adminCategoryRouter);
app.use("/api/quick-order", quickOrderRoutes);
app.use("/api/delivery", deliveryRoutes); 
/*GCosmosWeb*/
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
