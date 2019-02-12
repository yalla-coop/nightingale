const mongoos = require("mongoose");
const conversation = require("../models/Conversation");
const Mood = require("../models/Mood");

module.exports = (id, moodIndex) => new Promise(async (resolve, reject) => {
  const moods = await Mood.find();
  console.log("MOODS", moods);
  console.log("MOOD index", moods[moodIndex]._id);

  Mood.find().then((res) => {
    console.log(res, "moods 22222222222");
  });

  // console.log("moodIndex Q", moodIndex);
  // conversation.findOne()
  //   .then(res => console.log("resss", res));
  conversation.updateOne(
    { user: mongoos.Types.ObjectId(id), completed: false },
    { $set: { mood: moods[moodIndex]._id } },
  )
    .then((result) => {
      resolve(result);
      console.log("UPDATE RESULT", result);
    })
    .catch(error => reject(error));
});
