const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

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

// create a pre hook to hash user's password before store it in the DB
userSchema.pre("save", async (next) => {
  // get the plain password that user input
  const plainPassword = this.password;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  bcrypt.hash(plainPassword, 8)
    .then(hash => {
      // store the hashed password
      this.password = hash;
      next()
    })
    .catch(next)
})

module.exports = mongoose.model("users", userSchema);