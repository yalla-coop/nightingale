const mongoose = require("mongoose");

const { Schema } = mongoose;

const quickReplySchema = new Schema({
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "conversations",
  },
  replies: {
    type: [Object],
  },
});

module.exports = mongoose.model("quickReplies", quickReplySchema);
