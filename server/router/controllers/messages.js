
const getMessages = require("../../database/queries/messages");

module.exports = (req, res) => {
  const { conversationId } = req.params;
  getMessages(conversationId)
    .then((result) => {
      console.log("RESULT", result)
      res.json(result);
    })
    .catch(error => res.send(error));
};
