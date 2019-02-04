const Joi = require("joi");

const validate = (key, value) => {
  const schemas = {
      name: Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .required()
        .label("Name"),
      username: Joi.string()
        .min(3)
        .max(10)
        .required()
        .label("Username"),

      password: Joi.string()
        .min(3)
        .required()
        .label("Password"),
  }
  console.log(key, "key ", value ," value", typeof value ,"type value");
  
  return Joi.validate(value, schemas[key]);
};
export default validate;