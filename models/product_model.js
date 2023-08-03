const mongoose = require("mongoose");
// 1-create schema
const productschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "too short product name"],
      Maxlength: [100, "too long product name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },

    description: {
      type: String,
      required: [true, "product description is required"],
      trim: true,
      minlength: [20, "too short product description"],
    },
    quantity: {
      type: Number,
      required: [true, "product Quantity is required "],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "product price is required "],
      trim: true,
      Max: [200000, "too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },

    colors: [String],

    imageCover: {
      type: String,
      required: [true, "product image is required "],
    },
    image: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: [true, "subcategory must be belong to Parent category"],
    },

    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCaategory",
      },
    ],

    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "rating must be above or equal 1"],
      Max: [5, "rating must be below or equal 5"],
    },
    ratingQuantity: {
      type: Number,

      default: 0,
    },
  },
  { timestamps: true }
);

//mongoose query middleware
productschema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name -_id',
  });
  next();
});
// create model
module.exports = mongoose.model(`Product`, productschema);
