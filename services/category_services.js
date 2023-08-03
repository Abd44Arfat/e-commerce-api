const slugify = require("slugify");

const Category = require("../models/categorymodel");
const asyncHandler = require("express-async-handler");
const Factory = require("./HandlerFactory");
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../utils/ApiError");
const { uploadSingleImage } = require('../middlewares/uploadImage_miidleware');

//memory storage
exports.uploadCategoryImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/categories/${filename}`);

    // Save image into our db
    req.body.image = filename;
  }

  next();
});

exports.getCategories = Factory.getAll(Category);
// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.getCategory = Factory.getOne(Category);

exports.createCategory = Factory.createOne(Category);
// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateCategory = Factory.updateOne(Category);

/**
 * @desc Delete category
 * @route /api/v1/categories/:id
 * @method Delete
 * @access private
 */

exports.DeleteCategory = Factory.deleteOne(Category);
