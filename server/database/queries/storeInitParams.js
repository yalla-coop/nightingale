// stores birthday, favourite subject and least favourite subject for user

const User = require("../models/User");

const storeInitParams = (userId, birthday, faveSubj, leastFaveSubj) => newPromise((resolve, reject) => {
  const updateUser = param => User.findOneAndUpdate({ _id: userId }, { $set: { param } });

  switch (true) {
  case birthday:
    resolve(updateUser(birthday));
    break;
  case faveSubj:
    resolve(updateUser(faveSubj));
    break;
  case leastFaveSubj:
    resolve(updateUser(leastFaveSubj));
    break;
      // no default
  }
});
