var fs = require('fs');
var router = require('express').Router();
var filingRouter = require('./filing');

var institutionsObj = JSON.parse(fs.readFileSync('./server/json/institutions.json'));
var institutionsDetailObj = JSON.parse(fs.readFileSync('./server/json/institutions-detail.json'));

router.get('/', function(req, res){
  res.send(institutionsObj);
});

router.get('/:institution', function(req, res){
  return res.send(institutionsDetailObj[req.params.institution])
});

router.use('/:institution/filings', filingRouter);


module.exports = router;
