const mongoose = require("mongoose");

const cartitemSchema = new mongoose.Schema({
  id: { type: String },

  buyer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  Qt:{
    type: Number,
    default:1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.model("Cartitem", cartitemSchema);
module.exports = Cart;
