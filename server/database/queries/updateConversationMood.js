const mongoos = require("mongoose");
const conversation = require("../models/Conversation");

module.exports = (id, mood) => new Promise((resolve, reject) => {
  console.log("ID Q", id, "MOOD Q", mood);
  console.log("type off", typeof id);
  conversation.findOne()
    .then(res => console.log("resss", res));
  conversation.updateOne(
    { user: mongoos.Types.ObjectId(id) },
    { $set: { mood } },
  )
    .then((result) => {
      resolve(result);
      console.log("UPDATE RESULT", result);
    })
    .catch(error => reject("ERRROR", error));
});
