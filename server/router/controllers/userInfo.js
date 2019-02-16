const getUserDetails = require("../../database/queries/getUserDetails");

module.exports = (req, res) => {
  const { id } = req.user;
  getUserDetails(id)
    .then(info => res.status(200).json(info))
    .catch(err => console.log(err));
};
