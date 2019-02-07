const mongoos = require("mongoose");
const Conversation = require("../models/Conversation");

module.exports = id => new Promise((resolve, reject) => {
  Conversation.aggregate([
    {
      $match: {
        user: mongoos.Types.ObjectId(id),
        completed: true,
      },
    }, {
      $lookup: {
        from: "moods",
        localField: "mood",
        foreignField: "_id",
        as: "mood",
      },
    }, {
      $project: {
        _id: 0,
        moodEmoji: "$mood.moodEmoji",
        moodDescription: "$mood.moodDescription",
        score: "$mood.score",
        time: 1,
      },
    }, {
      $facet: {
        allmoodsCount: [
          { $count: "allmoodsCount" },
        ],
        moodsBystatus: [
          {
            $group: {
              _id: "$score",
              moodEmoji: { $first: { $arrayElemAt: ["$moodEmoji", 0] } },
              moodDescription: { $first: { $arrayElemAt: ["$moodDescription", 0] } },
              score: { $first: "$score" },
              count: { $sum: 1 },
            },
          }, {
            $sort: { score: 1 },
          },
        ],
        moodsByDays: [
          {
            $group: {
              _id: {
                $switch: {
                  branches: [
                    { case: { $eq: [{ $dayOfWeek: "$time" }, 1] }, then: "Sun" },
                    { case: { $eq: [{ $dayOfWeek: "$time" }, 2] }, then: "Mon" },
                    { case: { $eq: [{ $dayOfWeek: "$time" }, 3] }, then: "Tue" },
                    { case: { $eq: [{ $dayOfWeek: "$time" }, 4] }, then: "Weds" },
                    { case: { $eq: [{ $dayOfWeek: "$time" }, 5] }, then: "Thu" },
                    { case: { $eq: [{ $dayOfWeek: "$time" }, 6] }, then: "Fri" },
                    { case: { $eq: [{ $dayOfWeek: "$time" }, 7] }, then: "Sat" },
                  ],
                  default: "day not found",
                },

              },
              avg: { $push: "$score" },
              score: { $sum: 1 },
              count: { $avg: "$score" },
            },
          }, {
            $project: {
              dayAverage: {
                $trunc:
               {
                 $avg: {
                   $reduce: {
                     input: "$avg",
                     initialValue: [],
                     in: { $concatArrays: ["$$value", "$$this"] },
                   },
                 },
               },
              },
            },
          }, {
            $lookup: {
              from: "moods",
              localField: "dayAverage",
              foreignField: "score",
              as: "mood",
            },
          }, {
            $project: {
              moodEmoji: { $arrayElemAt: ["$mood.moodEmoji", 0] },
            },
          },
        ],
      },
    }, {
      $facet: {
        moodsBystatus: [
          {
            $project: {
              moodsBystatus: 1,
              allmoodsCount: 1,
            },
          }, {
            $unwind: "$moodsBystatus",
          }, {
            $addFields: {
              theAverage: { $multiply: [{ $divide: ["$moodsBystatus.count", { $arrayElemAt: ["$allmoodsCount.allmoodsCount", 0] }] }, 100] },
              id: { $arrayElemAt: ["$moodsBystatus._id", 0] },
              count: "$moodsBystatus.count",
              moodDescription: "$moodsBystatus.moodDescription",
              moodEmoji: "$moodsBystatus.moodEmoji",
            },
          },
        ],
        moodsByDays: [
          {
            $project: {
              moodsByDays: 1,
            },
          },
        ],
      },
    }, {
      $project: {
        moodsBystatus: { allmoodsCount: 0, moodsBystatus: 0 },
      },
    }, {
      $addFields: {
        moodsByDays: { $arrayElemAt: ["$moodsByDays.moodsByDays", 0] },
      },
    },
  ])
    .then(resolve)
    .catch(reject);
});
