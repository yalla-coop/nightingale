const NonSteadyEvent = require("../models/NonSteadyEvent");
const Mood = require("../models/Mood");
const User = require("../models/User");

const buildNonSteadyEvent = async () => {
  // get moods
  const moods = await Mood.find();

  // get default user "Nadia"
  const Nadia = await User.findOne();

  const nonSteadyEvents = [{
    user: Nadia,
    dates: ["2019-02-15", "2019-02-18"],
    eventEmotion: moods[0],
    text: "School trip",
  }, {
    user: Nadia,
    days: ["2019-02-1"],
    eventEmotion: moods[5],
    text: "History exam",
  }];

  return NonSteadyEvent.insertMany(nonSteadyEvents);
};

module.exports = buildNonSteadyEvent;
