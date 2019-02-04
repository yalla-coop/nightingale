// load models
const Message = require("../models/Message");

const storeUserMsg = async (userId, message, conversationId) => {
  const newMessage = new Message({
    conversation: conversationId,
    text: message,
    sender: "user",
  });

  await newMessage.save().catch(err => err);

  return newMessage;
};

module.exports = storeUserMsg;
