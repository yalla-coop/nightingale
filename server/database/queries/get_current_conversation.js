const mongoose = require("mongoose");
const Conversation = require("../models/Conversation");

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
      completed: false,
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
  }, {
    $project: {
      mood: 0,
      year: 0,
      month: 0,
      day: 0,
      user: 0,
      time: 0,
      completed: 0,
      _id: 0,
    },
  }, {
    $unwind: "$messages",
  }, {
    $unwind: "$messages.text",
  }, {
    $project: {
      text: "$messages.text",
      user: { $cond: { if: { $eq: ["$messages.sender", "bot"] }, then: "ai", else: "human" } },
      time: "$messages.time",
    },
  },
  ])
    .then(resolve)
    .catch(reject);
});
