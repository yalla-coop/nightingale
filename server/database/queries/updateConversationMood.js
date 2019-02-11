const conversation = require("../models/Conversation");

module.exports = (id, mood) => new Promise((resolve, reject) => {
  conversation.updateOne(
    { user: id, completed: false },
    { $set: { mood } },
  )
    .then((result) => {
      resolve(result);
    })
    .catch(error => reject(error));
});
