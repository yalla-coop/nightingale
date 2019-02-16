const User = require("./../models/User");

module.exports = userId => new Promise((resolve, reject) => {
  User.findById(userId)
    .then((userInfo) => {
      if (userInfo
      && userInfo.username
      && userInfo.birthDate
      && userInfo.faveSubj
      && userInfo.leastFaveSubj) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
    .catch(reject);
});
