var fs = require('fs');
var router = require('express').Router();
var irsObj = JSON.parse(fs.readFileSync('./server/json/irs.json'));
var crypto = require('crypto');

router.get('/', function (req, res) {
  res.send(irsObj);
});

router.post('/', function (req, res){
  var state = req.body.verified ? 11 : 10;
  var timestamp = state === 11 ? Date.now() : null;
  var receipt = state === 11 ? crypto.createHash('sha256').update(timestamp + '').digest('hex') : null;

  res.status(202).send({
    timestamp: timestamp,
    receipt: receipt
  });
});

module.exports = router;
