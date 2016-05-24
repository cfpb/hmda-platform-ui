var fs = require('fs');
var router = require('express').Router();
var irsObj = JSON.parse(fs.readFileSync('./server/json/irs.json'));

router.get('/', function (req, res) {
  console.log(irsObj);
  res.send(irsObj);
});

module.exports = router;
