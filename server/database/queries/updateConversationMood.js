const mongoos = require("mongoose");
const conversation = require("../models/Conversation");

module.exports = mood => new Promise((resolve, reject) => {
  console.log("MOOD Q", mood);
  conversation.findOne()
    .then(res => console.log("resss", res));
  conversation.updateOne(
    { completed: false },
    { $set: { mood } },
  )
    .then((result) => {
      resolve(result);
      console.log("UPDATE RESULT", result);
    })
    .catch(error => reject(error));
});
