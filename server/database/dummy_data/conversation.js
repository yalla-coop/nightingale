const Conversation = require("../models/Conversation");
const User = require("../models/User");
const Mood = require("../models/Mood")

const buildConversation = async () => {
  // get the default user "Nadia"
  const Nadia = await User.findOne();

  // get moods
  const moods = await Mood.find();

  const conversations = [{
    user: Nadia,
    mood: moods[0],
    completed: false,
  },{
    user: Nadia,
    mood: moods[1],
    completed: true,
    date: "2019-01-27"
  },{
    user: Nadia,
    mood: moods[1],
    completed: true,
    date: "2019-01-28"
  },{
    user: Nadia,
    mood: moods[0],
    completed: true,
    date: "2019-01-29"
  },{
    user: Nadia,
    mood: moods[4],
    completed: true,
    date: "2019-01-30"
  },{
    user: Nadia,
    mood: moods[3],
    completed: true,
    date: "2019-01-31"
  },{
    user: Nadia,
    mood: moods[2],
    completed: true,
    date: "2019-02-01"
  },{
    user: Nadia,
    mood: moods[0],
    completed: true,
    date: "2019-02-02"
  }];

  return Conversation.insertMany(conversations)
}

module.exports = buildConversation;
