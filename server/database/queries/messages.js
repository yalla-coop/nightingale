const mongoos = require("mongoose");
const Messages = require("../models/Message");

module.exports = conversationId => new Promise((resolve, reject) => {
  Messages.aggregate([
    {
      $match: {
        conversation: mongoos.Types.ObjectId(conversationId),
      },
    },
  ])
    .then((response) => {
      resolve(response);
    })
    .catch(error => reject(error));
});
