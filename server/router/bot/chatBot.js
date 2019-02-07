// calls pusher function

const processMessage = require("./process-message");

module.exports = (req, res) => {
  const { message } = req.body;
  processMessage(message, res);
};
