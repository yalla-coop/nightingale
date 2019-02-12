const SupportKeyword = require("./../models/SupportKeyword");

module.exports = text => new Promise((resolve, reject) => {
  SupportKeyword.aggregate([{ $match: { $text: { $search: text } } }, {
    $project: {
      _id: 0,
      category: 1,
      score: { $meta: "textScore" },
    },
  }, {
    $match: { score: { $gt: 1.0 } },
  }, {
    $sort: { score: -1 },
  }])
    .then(resolve)
    .catch(reject);
});
