var router = require('express').Router();

router.post('/', function (req, res) {
  var state = req.body.signed ? 13 : 12;

  res.status(202).send({
    status: {
      code: state,
      message: ""
    },
    timestamp: Date.now(),
    receipt: 'somehash'
  });
});

module.exports = router;
