const ApiError = require("../utils/ApiError");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const SubCategory = require("../models/subcategoriesmodel");
const Factory = require("./HandlerFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};
exports.getsubCategories = Factory.getAll(SubCategory);
// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.getSubCategory = Factory.getOne(SubCategory);
exports.createSubCategory = Factory.createOne(SubCategory);
// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updatesubCategory = Factory.updateOne(SubCategory);

/**
 * @desc Delete subcategory
 * @route /api/v1/subcategories/:id
 * @method Delete
 * @access private
 */

exports.DeletesubCategory = Factory.deleteOne(SubCategory);
