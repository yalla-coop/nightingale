const mongoos = require("mongoose");
const conversation = require("../models/Conversation");

module.exports = (id, mood) => new Promise((resolve, reject) => {
  console.log("ID Q", id, "MOOD Q", mood);
  console.log("type off", typeof mongoos.Types.ObjectId(id), "type off", typeof id);
  conversation.updateOne(
    { user: id },
    { $set: { mood } },
  )
    .then((result) => {
      resolve(result);
      console.log("UPDATE RESULT", result);
    })
    .catch(error => reject("ERRROR", error));
});
