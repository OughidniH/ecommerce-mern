const express = require("express");

const {
  handleImageUpload,
  addCategory,
  editCategory,
  fetchAllCategories,
  deleteCategory,
} = require("../../controllers/admin/category-controller");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addCategory);
router.put("/edit/:id", editCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/", fetchAllCategories);

module.exports = router;
