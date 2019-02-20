const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

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
