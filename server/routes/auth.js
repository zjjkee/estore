const router = require("express").Router();
const signupValidation = require("../validation").signupValidation;
const signinValidation = require("../validation").signinValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");


router.use((req, res, next) => {
    console.log("A request is coming in to auth.js");
    next();
  });

router.get("/test", (req, res) => {
    const msgObj = {
        message: "Test Get is working.",
    };
    res.send(msgObj)
// return res.json(msgObj);
});

router.post("/test", (req, res) =>{
    console.log('Test Post is working');
    console.log(signupValidation(req.body));
    const msgObj = {
        test:'Test Post is working'
    };
    res.json(msgObj)
})


router.post("/signup", async (req, res) => {

    // check the validation of data
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    
    // check if the user exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(400).send("Email has already been registered.");
  
    // register the user
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    });
    try {
      const savedUser = await newUser.save();
      res.status(200).send({
        msg: "success",
        savedObject: savedUser,
      });
    } catch (err) {
      res.status(400).send("User not saved.");
    }
  }); 

router.post('/signin',async (req, res) => {
    
    // check the validation of data
    // const { error } = signinValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email_or_username })
    if(!user){
        user = await User.findOne({ username: req.body.email_or_username });
    }
    if (!user) {
        res.status(401).send("Username or Password was Wrong");
        } else {

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) return res.status(400).send(err);
            if (isMatch) {
            const tokenObject = { _id: user._id, email: user.email };
            const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
            res.send({ success: true, token: "JWT " + token, user });
            } else {
            res.status(401).send("Username or Password was Wrong");
            }
        });
        }



});



module.exports = router;