const mongoose = require("mongoose");

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: false
  },
  class: {
    type: String,
      required: false
  }

})

module.exports = mongoose.model("users", userSchema);