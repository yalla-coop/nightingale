const createError = require("http-errors");

const moodsBydaysQuery = require("./../../database/queries/dashboard_statistics");

module.exports = (req, res, next) => {
  const { id } = req.user;

  moodsBydaysQuery(id)
    .then((moodByDaysResult) => {
      res.json(moodByDaysResult);
    }).catch(() => next(createError(500)));
};
