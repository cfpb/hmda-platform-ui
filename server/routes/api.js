var router = require('express').Router();
var institutionRouter = require('./institutionFirst');
var yearRouter = require('./yearFirst');

router.get('/', function(req, res) {
  res.send('Welcome to the api');
});

router.use('/institutions', institutionRouter);
router.use('/years', yearRouter);

module.exports = router;
