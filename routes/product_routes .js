const express = require("express");
const {
  createProductValidator,
  deleteProductValidator,
  getProductValidator,
  updateProductValidator,
} = require("../utils/validator/product_validator");
const {
  Deleteproduct,
  createproduct,
  getproduct,
  getproducts,
  updateproduct,
} = require("../services/product_services");

const router = express.Router();
router.route("/").get(getproducts).post(createProductValidator,createproduct);


router
  .route("/:id")
  .get(getProductValidator, getproduct)
  .put(updateProductValidator,updateproduct)
  .delete(deleteProductValidator,Deleteproduct);

module.exports = router;
