const mongoose = require("mongoose");

const { Schema } = mongoose;

const eventIntentSchema = new Schema({
  intent: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("eventsIntents", eventIntentSchema);
