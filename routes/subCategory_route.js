const express = require("express");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validator/subcategory_validator");

const {
  createSubCategory,
  getsubCategories,
  getSubCategory,
  DeletesubCategory,
  updatesubCategory,
  setCategoryIdToBody,
  createFilterObj
} = require("../services/subcategory_services");


const router = express.Router({mergeParams:true});



router
  .route("/")
  .post(setCategoryIdToBody,createSubCategoryValidator, createSubCategory)
  .get(createFilterObj,getsubCategories);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updatesubCategory)
  .delete(deleteSubCategoryValidator, DeletesubCategory);
module.exports = router;
