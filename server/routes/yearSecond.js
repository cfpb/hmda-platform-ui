var router = require('express').Router();
var submissionRouter = require('./submissions');

router.get('/', function(req, res){
  res.send({years: ['2017']});
})

router.get('/:year', function(req, res){
  res.sendFile('year.json', {root: './server/json'});
});

router.post('/:year', function (req, res) {
  res.status(202).send({
    id: 1,
    progress: req.url + '/submissions/1/progress'
  });
});

router.use('/:year/submissions', submissionRouter);


  module.exports = router;
