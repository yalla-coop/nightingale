const { compare } = require("bcryptjs");

module.exports = async (plainPassword, hashedPassword) => new Promise((resolve, reject) => {
  compare(plainPassword, hashedPassword)
    .then(resolve)
    .catch(reject);
});
