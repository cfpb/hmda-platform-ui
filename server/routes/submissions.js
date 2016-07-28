var fs = require('fs');
var router = require('express').Router({mergeParams: true});
var progressRoute = require('./progress');
var editRoute = require('./edits');
var irsRoute = require('./irs');
var signRoute = require('./sign');

var submissionsObj = JSON.parse(fs.readFileSync('./server/json/submissions.json'));

router.get('/', function(req, res){
  var submissions = submissionsObj[req.params.institution];
  if(!submissions) res.status(404).end();
  res.send(submissions)
});

router.post('/', function(req, res){
  //increment currentSubmission, 1 here, assuming starting at zero
  res.status(201).send({currentSubmission: 1})
});

router.get('/:submission', function(req, res){
  var submissions = submissionsObj[req.params.institution].submissions;

  for(var i=0; i<submissions.length; i++){
    if(submissions[i].id === req.params.submission){
      return res.send(submissions[i]);
    }
  }

  res.status(404).end();
});

router.post('/:submission', function (req, res) {
  req.on('data', function(d){console.log(d.length)});
  req.on('end', function(){
    res.status(202).send({
      progress: req.url + '/progress'
    });
  });
});

router.use('/:submission/progress', progressRoute);
router.use('/:submission/edits', editRoute);
router.use('/:submission/irs', irsRoute);
router.use('/:submission/sign', signRoute);

module.exports = router;
