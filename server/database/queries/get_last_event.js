const User = require("./../models/User");

module.exports = userID => User.findById(userID, { _id: 0, lastEvent: 1 });
