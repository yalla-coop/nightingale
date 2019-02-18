const Message = require("../models/Message");
const Conversation = require("./../models/Conversation");

const buildMessage = async () => {
  // get today conversation
  const conversation = await Conversation.findOne({
    completed: false,
  });

  const messages = [{
    conversation,
    text: ["Hi Nadia"],
    sender: "bot",
  }, {
    conversation,
    text: ["How was your school day?"],
    sender: "bot",
  }, {
    conversation,
    text: ["it was amazing"],
    sender: "user",
  }, {
    conversation,
    text: [
      "I am really happy to hear that! it's always nice to have an amazing day",
    ],
    sender: "bot",
  }, {
    conversation,
    text: [
      "So come on spill, why was it an amazing day?",
    ],
    sender: "bot",
  }, {
    conversation,
    text: ["I had a good lessons today"],
    sender: "user",
  }, {
    conversation,
    text: ["Ah nice, What lesson did you have that was good?"],
    sender: "bot",
  }, {
    conversation,
    text: ["it was Maths"],
    sender: "user",
  }, {
    conversation,
    text: ["That's great!", "Do you usually enjoy Maths"],
    sender: "bot",
  }, {
    conversation,
    text: ["Actually no"],
    sender: "user",
  }, {
    conversation,
    text: ["what was it about this lesson?"],
    sender: "bot",
  }, {
    conversation,
    text: ["It was intresting"],
    sender: "user",
  }, {
    conversation,
    text: [
      "Good to hear you found it intresting, lets hope the next lesson in the same!"
    ],
    sender: "bot",
  },
  {
    conversation,
    text: [
      "Remeber you can write down your thoughts on anything you want... it's a good practice to get into!",
    ],
    sender: "bot",
  }];

  return Message.insertMany(messages);
};

module.exports = buildMessage;
