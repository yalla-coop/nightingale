const conversation = require("../models/Conversation");
const mongoos = require("mongoose");

module.exports = (id, mood) => new Promise((resolve, reject) => {
  console.log("ID Q", id, "MOOD Q", mood )
  conversation.updateOne(
    { user: mongoos.Types.ObjectId(id)},
    { $set: { mood } },
  )
    .then((result) => {
      resolve(result);
    })
    .catch(error => reject("ERRROR",error));
});

