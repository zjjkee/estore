const { product } = require(".");

const router = require("express").Router();
const Order = require("../models").orderModel;
const ObjectId = require('mongoose').Types.ObjectId


router.use((req, res, next) => {
    console.log("A request is coming in to Order-Route");
    next();
  });

router.post("/",(req,res)=>{
    console.log('req.body',req.body);
    
    Order.create({
        buyer:req.user._id,
        id:req.body.id,
        amount:req.body.amount,
        goods:req.body.goods,
        address:req.body.address,

    }).then(data=>{
        res.send("Order Has been Made!")
    }).catch(e=>res.send("Order fails"))
})

router.get("/",(req,res)=>{
    Order.find({buyer:req.user._id}).then(data=>{
        res.status(200).send(data)
    }).catch(e=>{res.send("Order Info Got Wrong.")})
    
})

module.exports = router