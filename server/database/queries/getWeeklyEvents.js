const mongoose = require("mongoose");
const WeeklyEvent = require("./../models/WeeklyEvent");

module.exports = userId => new Promise((resolve, reject) => {
  console.log("REACJED HERE");
  WeeklyEvent.find({ user: mongoose.Types.ObjectId(userId) })
    .then((result) => {
      console.log("RES", result);
      resolve(result);
    })
    .catch(reject);
});
