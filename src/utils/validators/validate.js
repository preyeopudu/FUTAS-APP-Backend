const CustomError = require('../CustomError');

const validate = (schema, data) => {
  try {
    const { value, error } = schema.validate(data);
    if (error) {
      throw error;
    }
    return value;
  } catch (error) {
    const err = error.message;
    throw new CustomError(err, 409);
  }
};

module.exports = validate;
