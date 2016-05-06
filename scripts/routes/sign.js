var router = require('express').Router();

router.post('/', function (req, res) {
  res.send({
    timestamp: Date.now(),
    receipt: 'somehash'
  });
});

module.exports = router;
