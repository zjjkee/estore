const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const Product = require("./models").productModel;

const fs = require("fs");
const https = require("https");

const authRoute = require("./routes").auth;
const productRoute = require("./routes").product;
const cartRoute = require("./routes").cart;
const orderRoute = require("./routes").order;

const passport = require("passport");
require("./config/passport")
const cors = require("cors");


// connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });



  // middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", authRoute);

app.get("/api/allproducts", (req, res) =>{ 
  Product.find({}).populate("seller",["username","email"]).then(data=>{
      // console.log('data',data);
      res.status(200).send(data)
  })
})

app.use(
  "/api/products",
  passport.authenticate("jwt", { session: false }),
  productRoute
);

app.use(
  "/api/mycart",
  passport.authenticate("jwt", { session: false }),
  cartRoute
);

app.use(
  "/api/order",
  passport.authenticate("jwt", { session: false }),
  orderRoute
)

// app.listen(8080, () => {
//   console.log("Server running on port 8080.");
// });

const PORT =8080;
const options = {
          key: fs.readFileSync('./private.key'),
          cert: fs.readFileSync('./certificate.crt')
};
https.createServer(options,app).listen(PORT, () => console.log(`App listening on port ${PORT}!`));
