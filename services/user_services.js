const slugify = require("slugify");
const createCategory = require("../models/categorymodel");
const User = require("../models/user_model");
const bcrypt = require('bcryptjs');

const asyncHandler = require("express-async-handler");
const ApiFeatures = require("../utils/Api_features");
const ApiError = require("../utils/ApiError");
const Factory = require("./HandlerFactory");
const sharp = require("sharp");

const { v4: uuidv4 } = require("uuid");

const { uploadSingleImage } = require('../middlewares/uploadImage_miidleware');

exports.uploadUserImage = uploadSingleImage('profileImg');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${filename}`);

    // Save image into our db
    req.body.profileImg = filename;
  }

  next();
});
exports.getAllUsers = Factory.getAll(User);
// @desc    Update specific user
// @route   PUT /api/v1/user/:id
// @access  Private
exports.getoneUser = Factory.getOne(User);

exports.createUser = Factory.createOne(User);
// @desc    Update specific user
// @route   PUT /api/v1/user/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
exports.updateUser = Factory.updateOne(User);

/**
 * @desc Delete user
 * @route /api/v1/user/:id
 * @method Delete
 * @access private
 *
 *
 *
 */

exports.DeleteUser = Factory.deleteOne(User);