// stores birthday, favourite subject and least favourite subject for user
const mongoose = require("mongoose");

const WeeklyEvent = require("../models/WeeklyEvent");

const makeDaysArray = require("./makeDaysArray");

module.exports = (id, array) => new Promise((resolve, reject) => {
  WeeklyEvent.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(id),
      },
    },
    // {
    //   $lookup: {
    //     from: "users",
    //     localField: "faveSubj",
    //     foreignField: "_id",
    //     as: "faveSubj",
    //   },
    // },
    {
      $project: {
        user: "$users.name",
        days: makeDaysArray(array),
        text: "$users.faveSubj",
      },
    },
  ])
    .then(resolve)
    .catch(reject);
});
