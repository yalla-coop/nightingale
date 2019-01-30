const mongoose = require("mongoose");

const { Schema } = mongoose;

const moodSchema = new Schema({
  moodEmoji: {
    type: String,
    required: true,
  },
  moodDescription: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

module.exports = mongoose.model("moods", moodSchema);
