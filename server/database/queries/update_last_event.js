const User = require("./../models/User");

module.exports = (userID, event) => User.findByIdAndUpdate(userID, { lastEvent: event });
