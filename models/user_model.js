const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// 1-create schema
const Userchema = new mongoose.Schema({
  name: {
    type: String,
    trim:true,
    required: [true, "name required"],

    minlength: [3, "too short Brand name"],
    Maxlength: [32, "too long Brand name"],
  },

  slug: {
    type: String,
    lowercase: true,
  },
  email: {
    type: String,
    uniqe:true,
    required: [true, "email required"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'password required'],
    minlength: [6, 'Too short password'],
  },
  phone: String,
  profileImg:String,
  email: {
    type: String,
    uniqe:true,
    
    minlength: [6, "too short Password "],

  },
  role:{
    type: String,
enum:["user","admin"]
  },
  active:{
    type: Boolean,
default:0,
  }

},{timestamps:true});
Userchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});


// create model
const User = mongoose.model(`User`, Userchema);
module.exports=User;

