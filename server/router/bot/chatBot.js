const processMessage = require("./process-message");

module.exports = (req, res, next) => {
  const message = req.body;
  console.log(message);
  processMessage(message);
};
