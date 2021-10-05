const Test = require('../models/testModel');

/**
 * This class is where all our logic for a specific controller file goes.
 */
class TestService {
  test(req) {
    return {
      url: req.originalUrl,
      message: 'hello world',
    };
  }
}

module.exports = new TestService();
