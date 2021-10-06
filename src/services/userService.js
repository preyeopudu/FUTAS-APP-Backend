const User = require('../db/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class userService {
  static createUser = async (data) => {
    try {
      const user = new User(data);
      return user.save();
    } catch (error) {
      throw error;
    }
  };

  static findByEmail = async (email) => {
    try {
      const user = await User.findOne({
        email,
      });
      return user;
    } catch (error) {
      throw error;
    }
  };

  static validatePasswordHash = (password, hash) => {
    return bcrypt.compareSync(password, hash);
  };

  static hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };

  static generateToken = (data) => {
    return jwt.sign(data, process.env.APP_SECRET);
  };

  static verifyToken = (token) => {
    return jwt.verify(token, process.env.APP_SECRET);
  };
}

module.exports = userService;
