const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: false,
  },
  class: {
    type: String,
    required: false,
  },
  birthDate: {
    type: Date,
    required: false,
    default: null,
  },
  faveSubj: {
    type: String,
    required: false,
  },
  leastFaveSubj: {
    type: String,
    required: false,
  },
});

function hashPassword(next) {
  // get the plain password that user input
  const plainPassword = this.password;
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();
  return bcrypt
    .hash(plainPassword, 8)
    .then((hash) => {
      // store the hashed password
      this.password = hash;
      next();
    })
    .catch(next);
}

// create a pre hook to hash user's password before store it in the DB
userSchema.pre("save", hashPassword);

module.exports = mongoose.model("users", userSchema);
