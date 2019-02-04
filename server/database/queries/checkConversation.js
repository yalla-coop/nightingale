const moment = require("moment");

// load models
const Conversation = require("../models/Conversation");

const checkConversation = async (userId) => {
  // check if conversation already exists
  // to do this use the date and see if a conversation has happened on that day
  // if so get the ID from that conversation
  // if not then trigger a function to create the conversation and return the id

  // get today's date
  const date = moment(Date.now()).format("YYYY-MM-DD");

  // get all conversations for that user
  const conversations = await Conversation.find({ user: userId });

  const filteredConv = conversations.filter(
    conv => moment(conv.time).format("YYYY-MM-DD") === date,
  );

  if (filteredConv.length > 0) {
    return filteredConv[0].id;
  }

  // otherwise create the conversation first
  const newConversation = new Conversation({
    user: userId,
  });

  return newConversation.id;
};

module.exports = checkConversation;
