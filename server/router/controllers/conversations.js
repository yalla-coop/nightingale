
const { getData } = require("../../database/queries/conversation");

exports.getConversations = (req, res) => {
  const { id } = req.params;
  getData(id)
    .then((result) => {
      res.send(result);
    })
    .catch(error => res.send(error));
};
