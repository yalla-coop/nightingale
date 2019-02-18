const mongoose = require("mongoose");
const LastQuickReply = require("../models/LastQuickReply");

module.exports = (messages, conversationId) => new Promise((resolve, reject) => {
// check for messages and store the the quick reply for the last message comes from bot

  const quickReplies = messages.filter(message => message.message === "quickReplies" || message.message === "card");

  const newReplies = [];

  quickReplies.map(message => newReplies.push({
    replies: message,
  }));

  LastQuickReply.updateOne({ conversation: conversationId },
    {
      $set: {
        conversation: mongoose.Types.ObjectId(conversationId),
        replies: newReplies,
      },
    }).then(resolve)
    .catch(reject);
});
