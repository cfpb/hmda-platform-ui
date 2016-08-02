var fs = require('fs');
var router = require('express').Router();
var periodRouter = require('./period');

var institutionsObj = JSON.parse(fs.readFileSync('./server/json/institutions.json'));
var filingsObj = JSON.parse(fs.readFileSync('./server/json/filings.json'));

router.get('/', function(req, res){
  res.send(institutionsObj);
});

router.get('/:institution', function(req, res){
  return res.send(filingsObj[req.params.institution])
});

router.use('/:institution/periods', periodRouter);


module.exports = router;
