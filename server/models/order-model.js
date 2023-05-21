const { string } = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: { type: String },

  buyer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  id:{
    type:String
  },
  amount:{
    type:Number,
  },
  goods:{
    type:[{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          }, 
        seller:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        title:{
          type:String
        },
        price:{
          type:Number
        },
        Qt:{
            type:Number
          }
    }]
  },
  address:{
    type:{
        'firstname':String,
        'lastname':String,
        'address1':String,
        'phone':String,
        'city':String,
        'state':String,
        'zip':String,
        'country':String,
    }
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
