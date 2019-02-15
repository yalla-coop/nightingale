const User = require("../models/User");

module.exports = async (userId) => {
  const userDetails = await User.findById(userId).catch(err => console.log(err));
  console.log("user", userDetails);

  return userDetails.name;
};
