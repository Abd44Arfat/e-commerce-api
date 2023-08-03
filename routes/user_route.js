const express = require("express");
 const{createUserValidator,getUserValidator,updateUserValidator,deleteUserValidator,changeUserPasswordValidator}=require('../utils/validator/usersvalidator')
const {
DeleteUser,createUser,getAllUsers,getoneUser,updateUser,uploadUserImage,resizeImage,changeUserPassword
} = require("../services/user_services");

const router = express.Router();
router.route("/").get(getAllUsers).post(uploadUserImage,resizeImage,createUserValidator,createUser);
router.put(
  '/changePassword/:id',
  changeUserPasswordValidator,
  changeUserPassword
);
router
  .route("/:id")
  .get(getUserValidator,getoneUser)
  .put(uploadUserImage,resizeImage,updateUserValidator,updateUser)
  .delete(deleteUserValidator,DeleteUser);

module.exports = router;
