const User = require("../models/User");

module.exports = ({ username, name, password }) => new Promise((resolve, reject) => {
  // check for username
  User.findOne({ username })
    .then((user) => {
      // return error if the username is already in use
      if (user) return reject(new Error("username already taken"));

      // else create new user
      return User.create({ username, name, password })
        .then(resolve)
        .catch((err) => {
          reject(err);
        });
    })
    .catch((err) => {
      reject(err);
    });
});
