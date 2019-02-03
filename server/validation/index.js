const Joi = require("joi");
const registerSchema = require("./register");

const schemas = {
  register: registerSchema,
};

module.exports = (data, schema) => new Promise((resolve, reject) => {
  Joi.validate(data, schemas[schema])
    .then(resolve)
    .catch(err => reject(err.details[0].message));
});
