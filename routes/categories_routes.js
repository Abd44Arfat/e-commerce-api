const express = require("express");

const {
  getCategoryValidator,
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} = require("../utils/validator/categoryvalidator");
const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  DeleteCategory,
  uploadCategoryImage,
  resizeImage
} = require("../services/category_services");
const subcategoriesRoute = require("./subCategory_route");

const router = express.Router();
router
  .route("/")
  .get(getCategories)
  .post(
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  );

router.use("/:categoryId/subcategories", subcategoriesRoute);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(  uploadCategoryImage,
    resizeImage,updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, DeleteCategory);

module.exports = router;
