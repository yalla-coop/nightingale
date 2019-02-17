const createError = require("http-errors");

const registerQuery = require("../../database/queries/register");
const validation = require("./../../validation");
const createToken = require("./create_token");

module.exports = (req, res, next) => {
  const { username, name, password } = req.body;

  validation({ name, username, password }, "register")
    .then(async () => {
      // check the username is it's unique? and create new one
      await registerQuery({ name, username, password })
        .then((newUser) => {
          const data = { name, username, id: newUser.id };
          const token = createToken(data);
          // set the cookie to 1 day
          res.cookie("token", token, { maxAge: 86400000 });
          res.json(data);
        })
        .catch((err) => {
          if (err.message === "username already taken") {
            // handle Bad request , duplicated username
            return next(createError(409, "username already taken"));
          }
          // handle server error in DB query
          return next(createError(500));
        });
    })
    // handle Bad requests in validation
    .catch(err => next(createError(400, err)));
};
