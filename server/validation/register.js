
const Joi = require("joi");

module.exports = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(15)
    .required()
    .label("name"),
  password: Joi.string().alphanum().min(3)
    .required()
    .label("password"),
  username: Joi.string().alphanum().min(3).max(10)
    .required()
    .label("username"),
});
