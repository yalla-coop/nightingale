// stores birthday, favourite subject and least favourite subject for user

const User = require("../models/User");

module.exports = (userId, key, val) => new Promise((resolve, reject) => {
  const updateUser = User.findOneAndUpdate({ _id: userId }, { $set: { [key]: val } });

  resolve(updateUser);
});
