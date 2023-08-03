const express = require("express");
const{getBrandValidator,deleteBrandValidator,updateBrandValidator,createBrandValidator}=require('../utils/validator/brandvalidator ')
const {
  getonebrand,
  getAllBrands,
  createbrand,
  updatebrand,
  Deletebrand,
  uploadBrandImage,
  resizeImage,
} = require("../services/brand_services ");

const router = express.Router();
router.route("/").get(getAllBrands).post(uploadBrandImage,
  resizeImage,createBrandValidator,createbrand);

router
  .route("/:id")
  .get(getBrandValidator,getonebrand)
  .put(uploadBrandImage,
    resizeImage,updateBrandValidator,updatebrand)
  .delete(deleteBrandValidator,Deletebrand);

module.exports = router;
