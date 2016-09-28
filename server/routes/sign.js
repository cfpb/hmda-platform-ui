var fs = require('fs');
var router = require('express').Router();
var crypto = require('crypto');

router.get('/', function(req, res) {
  res.send(JSON.parse(fs.readFileSync('./server/json/receipt.json')));
});

router.post('/', function (req, res) {
  var state = req.body.signed ? 12 : 11;
  var timestamp = state === 12 ? Date.now() : null;
  var receipt = state === 12 ? crypto.createHash('sha256').update(timestamp + '').digest('hex') : null;

  res.status(202).send({
    timestamp: timestamp,
    receipt: receipt
  });
});

module.exports = router;
