const slugify = require("slugify");

const Product = require("../models/product_model");
const asyncHandler = require("express-async-handler");
const ApiFeatures = require("../utils/Api_features");
const ApiError = require("../utils/Api_features");
const Factory = require("./HandlerFactory");

exports.getproducts = Factory.getAll(Product);
// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.getproduct = Factory.getOne(Product);
exports.createproduct = Factory.createOne(Product);
// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateproduct = Factory.updateOne(Product);

/**
 * @desc Delete category
 * @route /api/v1/categories/:id
 * @method Delete
 * @access private
 */

exports.Deleteproduct = Factory.deleteOne(Product);
