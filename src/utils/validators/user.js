const Joi = require('joi');
const validate = require('./validate');

class userValidator {
  static validateSignup(data) {
    const schema = Joi.object().keys({
      lastName: Joi.string().required(),
      firstName: Joi.string().required(),
      phoneNumber: Joi.number().required(),
      email: Joi.string().email(),
      password: Joi.string().required(),
    });
    return validate(schema, data);
  }

  static validateSignin(data) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    return validate(schema, data);
  }
}

module.exports = userValidator;
