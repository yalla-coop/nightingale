const moment = require("moment");

// load models
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const storeUserMsg = async (userId, message) => {
  // need to see if conversation already exists
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

  console.log("CONV", filteredConv);

  // if there is a conversation then use that conversation id
  if (filteredConv.length > 0) {
    const newMessage = new Message({
      conversation: filteredConv[0].id,
      text: message,
      sender: "user",
    });

    await newMessage.save().catch(err => err);
    return newMessage;
  }

  // otherwise create the conversation first
  const newConversation = new Conversation({
    user: userId,
  });

  await newConversation.save().catch(err => err);
  console.log("newConv", newConversation.id);

  // now store the message
  const newMessage = new Message({
    conversation: newConversation.id,
    text: message,
    sender: "user",
  });

  await newMessage.save().catch(err => err);

  return newMessage;
};

module.exports = storeUserMsg;
