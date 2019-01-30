const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const weeklyEventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  days: [Number], // array of days indexes
  eventEmotion: {
    type: Schema.Types.ObjectId,
    ref: "moods"
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("weeklyEvents", weeklyEventSchema);