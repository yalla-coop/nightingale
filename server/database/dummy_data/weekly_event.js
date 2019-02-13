const WeeklyEvents = require("../models/WeeklyEvent");
const Mood = require("../models/Mood");
const User = require("../models/User");

const buildWeeklyEvents = async () => {
  // get moods
  const moods = await Mood.find();

  // get default user "Nadia"
  const Nadia = await User.findOne();

  const weeklyEvents = [
    {
      user: Nadia,
      days: [1, 3, 5],
      eventEmotion: moods[0],
      text: "leastFaveSubj: Math lesson",
    },
    {
      user: Nadia,
      days: [2, 4],
      eventEmotion: moods[5],
      text: "faveSubj: History lesson",
    },
  ];

  return WeeklyEvents.insertMany(weeklyEvents);
};

module.exports = buildWeeklyEvents;
