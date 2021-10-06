const userService = require('../services/userService');
const CustomError = require('../utils/CustomError');
const userValidator = require('../utils/validators/user');
const response = require('../utils/response');

exports.login = async (req, res, next) => {
  try {
    const { body } = req;

    const data = userValidator.validateSignin(body);

    const user = await userService.findByEmail(data.email);

    if (!user) {
      throw new CustomError("User with this email doesn't exist", 409);
    }

    const validPassword = userService.validatePasswordHash(
      data.password,
      user.password
    );

    if (!validPassword) {
      throw new CustomError('Password Incorrect', 401);
    }

    const tokenData = {
      email: user.email,
      role: user.role,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = userService.generateToken(tokenData);

    return response.success(res, {
      message: 'Login successful',
      data: {
        ...tokenData,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.register = async (req, res, next) => {
  try {
    const { body } = req;

    const data = userValidator.validateSignup(body);

    const userExist = await userService.findByEmail(data.email);

    if (userExist) {
      throw new CustomError('User with this email already exist', 409);
    }

    data.password = userService.hashPassword(data.password);

    const user = userService.createUser(data);

    const tokenData = {
      email: user.email,
      role: user.role,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = userService.generateToken(tokenData);

    return response.success(res, {
      message: 'Signup successful',
      data: {
        ...tokenData,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
