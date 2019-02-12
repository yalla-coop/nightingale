const mongoose = require("mongoose");
const Conversation = require("./../models/Conversation");

module.exports = userId => new Promise((resolve, reject) => {
  Conversation.aggregate([{
    $addFields: {
      year: {
        $year: "$time",
      },
      month: {
        $month: "$time",
      },
      day: {
        $dayOfMonth: "$time",
      },
    },
  },
  {
    $match: {
      user: mongoose.Types.ObjectId(userId),
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1, // because January starts with 0
      day: new Date().getDate(),
    },

  }, {
    $lookup: {
      from: "messages",
      localField: "_id",
      foreignField: "conversation",
      as: "messages",
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "user",
      foreignField: "_id",
      as: "userInfo",
    },
  }, {
    $project: {
      _id: 0,
      userInfo: { $arrayElemAt: ["$userInfo", 0] },
      messages: 1,
    },
  }, {
    $project: {
      userInfo: {
        _id: 0, password: 0, birthDate: 0, __v: 0,
      },
    },
  },
  ])
    .then(resolve)
    .catch(reject);
});
