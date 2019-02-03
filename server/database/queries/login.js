const User = require("./../models/User");

module.exports = username => new Promise((resolve, reject) => {
  User.findOne({ username })
    .then(resolve)
    .catch(reject);
});
