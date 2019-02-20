//Authentication, username, password, login, logout stuff

const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

//Load user model
const User = require("../../models/User");

//In server.js file, app.use("/api/users", users), this will get to the users, and from this point, go to /test. The full URL would be http://localhost:5000/api/users/test

//@route GET api/users/test
//@Desc Test users route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "users route works" }));

//@route GET api/users/register
//@Desc Register users
//@access Public
//The full URL would be http://localhost:5000/api/users/register
router.post("/register", (req, res) => {
  //Use mongoose to first find if the user has already existed in the database
  //findOne()
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", //Rating
        d: "mm" //Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          //save() returns a promise
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
