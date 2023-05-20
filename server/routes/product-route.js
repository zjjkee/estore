const router = require("express").Router();
const Product = require("../models").productModel;
const productValidation = require("../validation").productValidation;
const multer = require("multer");
const ObjectId = require('mongoose').Types.ObjectId

const upload = multer({})

router.use((req, res, next) => {
    console.log("A request is coming in to product-route");
    next();
  });

router.get("/", (req, res) =>{
    Product.find({}).populate("seller").then(data=>{
        res.send(data)
    })
})

router.post("/", upload.single('file'), async (req, res) =>{
    // const { error } = productValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    console.log('req.file.mimetype',req.file.mimetype);
    

    let{title, category, description, price} = req.body;
    
    if(req.user.isBuyer()){
        res.status(400).send("Only Seller Can post Product")
    }
    let newProduct = new Product({
        mimetype: req.file.mimetype,
        buffer: req.file.buffer,

        title: title,
        category: category,
        price: price,
        description: description,
        seller: req.user._id
    })
    try{
        await newProduct.save();
        res.status(200).send("New Product has been saved");
    }catch(err){
        res.status(400).send("Cannot save.")
    }
})

router.get('/myproducts', (req, res) =>{ 
    Product.find({seller:req.user._id}).then(data=>{
        // console.log('data',data);
        res.status(200).send(data)
    }).catch(e=>res.send(e))
})
router.delete('/deleteproduct/:product_id',async (req,res) => {
    let {product_id} = req.params;
    console.log('product_id',typeof req.params.product_id);
    // var _id = new mongoose.mongo.ObjectId(product_id);
    var _id =  new ObjectId(product_id);
    console.log('_id',_id);
    

    console.log(_id)

    try{
        await Product.deleteOne({_id: _id});
        res.status(200).send("Product Delete Successfully!")
    }catch(err){
        res.status(400).send("Cannot Delete Now. Try Later")
    }
})

module.exports = router