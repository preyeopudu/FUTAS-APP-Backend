const router = require('express').Router();
const TestController = require('../controllers/TestController');

router.route('/').get(TestController.test);

module.exports = router;
