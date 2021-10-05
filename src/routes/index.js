const router = require('express').Router();

const testRoute = require('./testRoute');

/*
  This file serve as our entries file for all the routes we might have,

*/

router.use('/api/v1/tests', testRoute);

module.exports = router;
