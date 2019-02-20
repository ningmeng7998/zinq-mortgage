const express = require("express");
const mongoose = require("mongoose");

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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
