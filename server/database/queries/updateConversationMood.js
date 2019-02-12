const mongoos = require("mongoose");
const conversation = require("../models/Conversation");
const Mood = require("../models/Mood");

module.exports = (id, moodIndex) => new Promise(async (resolve, reject) => {
  const moods = await Mood.find();
  conversation.updateOne(
    { user: mongoos.Types.ObjectId(id), completed: false },
    { $set: { mood: mongoos.Types.ObjectId(moods[moodIndex]._id) } },
  )
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});
