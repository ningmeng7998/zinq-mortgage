//Authentication, username, password, login, logout stuff

const express = require("express");
const router = express.Router();

//In server.js file, app.use("/api/users", users), this will get to the users, and from this point, go to /test. The full URL would be http://localhost:5000/api/users/test

//@route GET api/users/test
//@access Public
router.get("/test", (req, res) => res.json({ msg: "users works" }));

module.exports = router;
