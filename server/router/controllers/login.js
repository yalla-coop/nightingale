const createError = require("http-errors");
const loginQuery = require("./../../database/queries/login");
const validatePassword = require("./validate_password");
const createToken = require("./create_token");

module.exports = (req, res, next) => {
  const { username, password: plainPassword } = req.body;
  // check for username in DB
  loginQuery(username)
    .then((user) => {
      // if there is no username matched return error
      if (!user) return next(createError(403, "Incorrect username or password."));
      // if username is exist check if the password is valid
      return validatePassword(plainPassword, user.password)
        .then((result) => {
          // if password not valid return Forbidden error
          if (!result) return next(createError(403, "Incorrect username or password."));
          // is the password matched create token and resonse with user data
          const token = createToken({
            id: user.id,
            name: user.name,
            username: user.username,
            bdate: user.birthDate,
          });
          res.cookie("token", token);
          return res.json({
            id: user.id,
            name: user.name,
            username: user.username,
            bdate: user.birthDate,
            token,
          });
        })
        .catch(() => next(createError(500)));
    })
    .catch(() => next(createError(500)));
};
