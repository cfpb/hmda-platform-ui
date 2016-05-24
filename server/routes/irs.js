var router = require('express').Router();

router.post('/', function (req, res) {
  res.send({
    test: 'test'
  });
});

module.exports = router;
