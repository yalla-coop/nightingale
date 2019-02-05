const mongoos = require("mongoose");
const Messages = require("../models/Message");

module.exports = id => new Promise((resolve, reject) => {
  Messages.aggregate([
    {
      $match: {
        conversation: mongoos.Types.ObjectId(id),
      },
    },
  ])
    .then((response) => {
      resolve(response);
    })
    .catch(error => reject(error));
});
