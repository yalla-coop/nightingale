
const createError = require("http-errors");

const getCurrentConversation = require("../../database/queries/get_current_conversation");

module.exports = (req, res, next) => {
  // get the user ID from the request
  const { id } = req.user;

  // get the current conversation for logged in user
  getCurrentConversation(id)
    .then((result) => {
      res.json(result);
    })
    .catch(() => next(createError(500)));
};
