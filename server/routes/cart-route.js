const router = require("express").Router();
const Cart = require("../models").cartModel;
const ObjectId = require('mongoose').Types.ObjectId


router.use((req, res, next) => {
    console.log("A request is coming in to cart-route");
    next();
  });

router.post("/", async (req,res) => {
    let tryfind = await Cart.findOne({
        buyer:req.user._id,
        product:new ObjectId(req.body.product_id)
    });    
    isexist = Boolean(tryfind);    
    if(!isexist){
        let newitem = new Cart({
            buyer:req.user._id,
            product:new ObjectId(req.body.product_id),
        })
        console.log('req.body',req.body.product_id);
            console.log('comming to addtocart');
        
        try{
            await newitem.save();
            res.status(200).send("Product Added Successfully!");
        } catch(err){
            res.status(400).send("Cannot Add Now")
        }
    } else{
        Cart.findOneAndUpdate({buyer:req.user._id,product:new ObjectId(req.body.product_id)},{"$inc":{Qt:1}}).then(data=>{
            res.status(200).send("Added Successfully!")
        })
    }
})

router.get("/", (req,res) => {
    Cart.find({buyer:new ObjectId(req.user._id)}).populate("product").then(data =>{
        res.status(200).send(data);
    }).catch(e=>{
        res.status(400).send("Cannot Get Cart")
    })
})

router.patch("/changeQt",async (req,res)=>{
    let {value,product_id} = req.body
    let cartitem = await Cart.findOne({buyer:req.user._id,product: new ObjectId(product_id)});
    if(value==-1){
        if(cartitem.Qt==1){
            res.send("Quantity Cannot Be Less Than 1")
        }else{
            Cart.findOneAndUpdate({buyer:req.user._id,product: new ObjectId(product_id)},{"$inc":{Qt:value}})
            .then(data=>res.status(200).send("Plus One!")).catch(e=>{res.status(401).send(e)})   
        }
    }else{
        Cart.findOneAndUpdate({buyer:req.user._id,product: new ObjectId(product_id)},{"$inc":{Qt:value}})
        .then(data=>res.status(200).send("Plus One!")).catch(e=>{res.status(401).send(e)});       

    }
})
router.delete("/remove", (req,res) =>{
    let {product_id} = req.body
    Cart.deleteOne({buyer:req.user._id,product:new ObjectId(product_id)}).then(data=>{
        res.status(200).send("Item Has Been Removed!")
    }).catch(e=>{
        res.status(400).send(e)
    })
})
router.delete("/removeall", (req,res) =>{
    Cart.deleteMany({buyer:req.user._id}).then(data=>{
        res.status(200).send("ALL Item Has Been Removed!")
    }).catch(e=>{
        res.status(400).send(e)
    })
})


module.exports = router