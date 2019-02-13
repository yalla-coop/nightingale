const mongoose = require("mongoose");
const WeeklyEvent = require("./../models/WeeklyEvent");

module.exports = userId => new Promise((resolve, reject) => {
  WeeklyEvent.find({ user: mongoose.Types.ObjectId(userId) })
    .then(resolve)
    .catch(reject);
});
