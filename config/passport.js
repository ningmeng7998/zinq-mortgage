//This is where we need to create our strategy -- a jwt strategy
//A Passport strategy for authenticating with a JSON Web Token.
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
//This 'user' is from the models/User. Make sure they match
const User = mongoose.model("users");
const keys = require("../config/keys");

//The JWT authentication strategy is constructed as follows: new JwtStrategy(options, verify)
//options is an object literal containing options to control how the token is extracted from the request or verified.
//verify is a function with the parameters verify(jwt_payload, done)
//jwt_payload is an object literal containing the decoded JWT payload.
//done is a passport error first callback accepting arguments done(error, user, info)
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

//This passport is a parameter passed from server.js -- passport config
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
