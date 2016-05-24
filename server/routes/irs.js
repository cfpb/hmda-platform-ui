var fs = require('fs');
var router = require('express').Router();
var irsObj = JSON.parse(fs.readFileSync('./server/json/irs.json'));

router.post('/', function (req, res) {
  res.send(irsObj);
});

module.exports = router;
