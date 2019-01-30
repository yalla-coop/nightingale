const Mood = require("../models/Mood");

const buildMood = () => {
  const moods = [
    {
      moodEmoji: "😃",
      moodDescription: "amazing",
      score: 5
    },
    {
      moodEmoji: "😌",
      moodDescription: "good",
      score: 4
    },
    {
      moodEmoji: "😔",
      moodDescription: "meh",
      score: 3
    },
    {
      moodEmoji: "😫",
      moodDescription: "not great",
      score: 2
    },
    {
      moodEmoji: "😡",
      moodDescription: "terrible",
      score: 1
    }
  ]
  return Mood.insertMany(moods);
}

module.exports = buildMood;

