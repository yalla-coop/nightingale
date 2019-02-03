const mongoos = require("mongoose");
const Conversations = require("../models/Conversation");
const User = require("../models/User");

exports.getData = id => new Promise((resolve, reject) => {
  // const id = "5c56a698cb10027b574c7074";

  Conversations.aggregate([
    {
      $match: {
        user: mongoos.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "moods",
        localField: "mood",
        foreignField: "_id",
        as: "mood",

      },
    },
    {
      $project: {
        dayOfWeek: {
          $cond: {
            if: {
              $eq: [{
                $dateToString: { format: "%Y-%m-%d", date: "$time" },
              }, { $dateToString: { format: "%Y-%m-%d", date: new Date() } }],
            },
            then: "Today",
            else: {
              $cond: {
                if: {
                  $eq: [{
                    $dateToString: { format: "%Y-%m-%d", date: "$time" },
                  }, { $dateToString: { format: "%Y-%m-%d", date: new Date(new Date().setDate(new Date().getDate() - 1)) } }],
                },
                then: "Yesterday",
                else: {
                  $switch: {
                    branches: [
                      { case: { $eq: [{ $dayOfWeek: "$time" }, 1] }, then: "Sunday" },
                      { case: { $eq: [{ $dayOfWeek: "$time" }, 2] }, then: "Monday" },
                      { case: { $eq: [{ $dayOfWeek: "$time" }, 3] }, then: "Tuesday" },
                      { case: { $eq: [{ $dayOfWeek: "$time" }, 4] }, then: "Wednesday" },
                      { case: { $eq: [{ $dayOfWeek: "$time" }, 5] }, then: "Thursday" },
                      { case: { $eq: [{ $dayOfWeek: "$time" }, 6] }, then: "Friday" },
                      { case: { $eq: [{ $dayOfWeek: "$time" }, 7] }, then: "Saturday" },
                    ],
                    default: "day not found",
                  },
                },
              },
            },
          },

        },
        date: {
          $concat: [{ $toString: { $dayOfMonth: "$time" } }, " ", {
            $switch: {
              branches: [
                { case: { $eq: [{ $month: "$time" }, 1] }, then: "Jan" },
                { case: { $eq: [{ $month: "$time" }, 2] }, then: "Feb" },
                { case: { $eq: [{ $month: "$time" }, 3] }, then: "March" },
                { case: { $eq: [{ $month: "$time" }, 4] }, then: "April" },
                { case: { $eq: [{ $month: "$time" }, 5] }, then: "May" },
                { case: { $eq: [{ $month: "$time" }, 6] }, then: "Jun" },
                { case: { $eq: [{ $month: "$time" }, 7] }, then: "July" },
                { case: { $eq: [{ $month: "$time" }, 8] }, then: "Aug" },
                { case: { $eq: [{ $month: "$time" }, 9] }, then: "Sep" },
                { case: { $eq: [{ $month: "$time" }, 10] }, then: "Oct" },
                { case: { $eq: [{ $month: "$time" }, 11] }, then: "Nov" },
                { case: { $eq: [{ $month: "$time" }, 12] }, then: "Dec" },
              ],
              default: "month not found",
            },
          }],
        },
        mood: 1,
      },
    },
  ])
    .then((response) => {
      resolve(response);
    })
    .catch(error => reject(error));
});

// To Get User Id
const Get = () => {
  User.findOne()
    .then((res) => {
      console.log(res);
    });
};


Get();
