const express = require("express");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validator/authvalidator");
const { signup, login } = require("../services/auth_services");

const router = express.Router();
router
  .route("/signup")

  .post(signupValidator, signup);
  router
  .route("/login")

  .post(loginValidator,login);

// router
//   .route("/:id")
//   .get(getUserValidator, getoneUser)
//   .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
//   .delete(deleteUserValidator, DeleteUser);

module.exports = router;
