const mongoose = require("mongoose");
// 1-create schema
const brandschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, " required"],
    unique: [true, " Brand must be uniqued"],
    minlength: [3, "too short Brand name"],
    Maxlength: [32, "too long Brand name"],
  },
  slug: {
    type: String,
    lowercase: true,
  },
image:{
type:String,

},

},{timestamps:true});
const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};
// findOne, findAll and update
brandschema.post('init', (doc) => {
  setImageURL(doc);
});

// create
brandschema.post('save', (doc) => {
  setImageURL(doc);
});

// create model
module.exports = mongoose.model(`Brand`, brandschema);

