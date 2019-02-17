const userInfo = require("../../database/queries/getUserDetails");

module.exports = async (req, res) => {
  const { id } = req.user;
  await userInfo(id)
    .then(user => res.json(user))
    .catch(err => console.log(err));
};
