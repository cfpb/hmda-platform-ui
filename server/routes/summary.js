var fs = require('fs');
var router = require('express').Router();

router.get('/', function(req, res) {
  res.send(JSON.parse(fs.readFileSync('./server/json/summary.json')));
});

module.exports = router;
