//The convention for a model file is starting with a Capital and use singular

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//mongoose.model   The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural version of your model name.
module.exports = User = mongoose.model("user", UserSchema);
