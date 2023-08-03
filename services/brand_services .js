const slugify = require("slugify");

const Brand = require("../models/brand_model");
const asyncHandler = require("express-async-handler");

const Factory = require("./HandlerFactory");
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

const { uploadSingleImage } = require('../middlewares/uploadImage_miidleware');




exports.uploadBrandImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/brands/${filename}`);

  // Save image into our db 
   req.body.image = filename;

  next();
});
exports.getAllBrands = Factory.getAll(Brand);
// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.getonebrand = Factory.getOne(Brand);

exports.createbrand = Factory.createOne(Brand);
// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updatebrand = Factory.updateOne(Brand);

/**
 * @desc Delete brand
 * @route /api/v1/brand/:id
 * @method Delete
 * @access private
 *
 *
 *
 */

exports.Deletebrand = Factory.deleteOne(Brand);
