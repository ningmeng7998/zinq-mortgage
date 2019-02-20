const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

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
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//set a simple route. Put the route in a different folder. Now it is for testing purpose
app.get("/", (req, res) => res.send("Hello"));

//Use routes
//We want /api/users to go to users
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
