const jwt = require("jsonwebtoken");

module.exports = (data) => {
  const token = jwt.sign(data, process.env.SECRET, { expiresIn: "1d" });
  return token;
};
