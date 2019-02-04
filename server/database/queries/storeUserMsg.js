const Message = require("../models/Message");

const storeUserMsg = message => new Promise((resolve, reject) => {
  const newMessage = new Message({
    conversation: "5c5831dd22611ab398779480",
    text: message,
    sender: "user",
  });

  newMessage
    .save()
    .then(resolve)
    .catch(err => reject(err));
});

module.exports = storeUserMsg;
