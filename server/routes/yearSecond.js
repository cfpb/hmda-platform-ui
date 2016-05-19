var router = require('express').Router();
var submissionRouter = require('./submissions');

router.get('/', function(req, res){
  res.send({years: ['2017']});
})

router.get('/:year', function(req, res){
  res.sendFile('year.json', {root: './server/json'});
});

router.use('/:year/submissions', submissionRouter);

module.exports = router;
