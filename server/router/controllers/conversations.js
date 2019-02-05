
const getData = require("../../database/queries/conversation");

module.exports = (req, res) => {
  const { id } = req.params;
  getData(id)
    .then((result) => {
      res.json(result);
    })
    .catch(error => res.send(error));
};
