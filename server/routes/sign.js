var fs = require('fs');
var router = require('express').Router();
var crypto = require('crypto');

router.get('/', function(req, res) {
  res.send(JSON.parse(fs.readFileSync('./server/json/receipt.json')));
});
router.post('/', function (req, res) {
  var state = req.body.signed ? 13 : 12;
  var timestamp = state === 13 ? Date.now() : null;
  var receipt = state === 13 ? crypto.createHash('sha256').update(timestamp + '').digest('hex') : null;

  res.status(202).send({
    status: {
      code: state,
      message: ""
    },
    timestamp: timestamp,
    receipt: receipt
  });
});

module.exports = router;
