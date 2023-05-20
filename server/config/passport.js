const passport =  require("passport")
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models").userModel;


let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = process.env.PASSPORT_SECRET;
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
  let user = await User.findOne({ _id: jwt_payload._id })
  try{
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  }catch(err){
    done(err,false);
  }

  })
);
