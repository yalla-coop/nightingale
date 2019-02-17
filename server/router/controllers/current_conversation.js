
const createError = require("http-errors");

const getCurrentConversation = require("../../database/queries/get_current_conversation");
const checkUserInfo = require("../../database/queries/check_user_info");

module.exports = (req, res, next) => {
  // get the user ID from the request
  const { id } = req.user;

  // get the current conversation for logged in user
  const promises = [getCurrentConversation(id), checkUserInfo(id)];
  Promise.all(promises).then((result) => {
    res.json(result);
  })
    .catch(() => next(createError(500)));
};
