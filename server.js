const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//Body parser middleware. It is used to extract the data out of the the request headers like the form data. Four different parser types: JSON, raw, Text, URL-encoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configure the database
const db = require("./config/keys").mongoURI;

//Connect mongodb through mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//set a simple route. Later will put the route in a different folder. Now it is for testing purpose
app.get("/", (req, res) => res.send("Hello"));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

//Use routes
//We want /api/users to go to users
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//If none of the above endpoints being hit, look at the index.html in client
//Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
