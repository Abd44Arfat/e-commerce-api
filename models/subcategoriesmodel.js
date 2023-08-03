const mongoose = require("mongoose");
// 1-create schema
const subcategoryschema = new mongoose.Schema({

name:{


  type:String,
  trim:true,
  unique:[true,'subcategory must be unique'],
  minlenght:[2,"too short subcategory name"],
  maxlenght:[32,"too long subcategory name"]

},

slug:{
type:String,
lowercase:true

},

category:{

  type:mongoose.Schema.ObjectId,
  ref: 'category',
  required:[true,"subcategory must be belong to Parent category"]
}


},{timestamps:true})
  const subCategory=mongoose.model("subCaategory",subcategoryschema)
  module.exports=subCategory