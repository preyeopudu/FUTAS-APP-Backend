const TestService = require('../services/TestService');

/**
 * This controller file,
 * 1) get all the data processed by it's respective services file
 * 2) and then send the require response
 */
class TestController {
  test(req, res) {
    const data = TestService.test(req);
    return res.status(200).json(data);
  }
}

module.exports = new TestController();
