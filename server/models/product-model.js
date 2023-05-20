const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: String },
  mimetype: {
    type: String,
    require:true
  },
  buffer: {
    type:Buffer,
    require:true
  },
  title: {
    type: String,
    required: true,
  },
  category:{
    type: String
  }
  ,
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
