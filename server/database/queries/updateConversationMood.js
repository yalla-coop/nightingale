const conversation = require("../models/Conversation");
const mongoos = require("mongoose");

module.exports = (id, mood) => new Promise((resolve, reject) => {
  conversation.updateOne(
    { user: mongoos.Types.ObjectId(id), completed: false },
    { $set: { mood } },
  )
    .then((result) => {
      resolve(result);
    })
    .catch(error => reject(error));
});
