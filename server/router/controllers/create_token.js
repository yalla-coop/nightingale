const jwt = require("jsonwebtoken");

module.exports = (data) => {
  const token = jwt.sign(JSON.stringify(data), process.env.SECRET);
  return token;
};
