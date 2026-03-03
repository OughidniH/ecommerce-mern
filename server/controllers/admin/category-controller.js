const { imageUploadUtil } = require("../../helpers/cloudinary");
const Category = require("../../models/Category");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);  
    res.json({  success: true,
      message: "Image uploaded successfully",
      url: result.url,
    });
  } catch (error) {
    console.error(error);
    res.json({  success: false,
      message: "Error occured",
    });
  }
};

//add a new category
const addCategory = async (req, res) => {
  try {
    const { image, nameCat } = req.body;
    const newlyCreatedCategory = new Category({
      image,
      nameCat,
    });
    await newlyCreatedCategory.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedCategory,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all categories
const fetchAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      success: true,
      data: categories,
    });
  }
    catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a category

const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, nameCat } = req.body;
        const categoryToUpdate = await Category.findById(id); 
        if (!categoryToUpdate) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        categoryToUpdate.image = image || categoryToUpdate.image;
        categoryToUpdate.nameCat = nameCat || categoryToUpdate.nameCat;
        await categoryToUpdate.save();
        res.status(200).json({
            success: true,
            data: categoryToUpdate,
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
};

//delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryToDelete = await Category
        .findByIdAndDelete(id); 
    if (!categoryToDelete) {
        return res.status(404).json({
            success: false,
            message: "Category not found",
        });
    }
    res.status(200).json({
        success: true,
        message: "Category deleted successfully",
    });
  }
    catch (e) { 
    console.error(e);
    res.status(500).json({
        success: false,
        message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addCategory,
  editCategory,
  fetchAllCategories,
  deleteCategory,
};