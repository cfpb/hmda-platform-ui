var router = require('express').Router();
var institutionRouter = require('./institutionSecond');

router.get('/', function(req, res){
  res.send({years: ['2017']});
});

router.get('/:year', function(req, res){
  res.sendFile('year.json', {root: './server/json'});
});

router.use('/:year/institutions', institutionRouter);


module.exports = router;
