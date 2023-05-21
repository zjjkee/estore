const dotenv = require("dotenv");
dotenv.config();
let a = process.env;
console.log(a.DB_CONNECT)