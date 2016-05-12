var fs = require('fs');
var router = require('express').Router();
var progressRoute = require('./progress');
var editRoute = require('./edits');
var signRoute = require('./sign');

var submissionsObj = JSON.parse(fs.readFileSync('./server/json/submissions.json'));

router.get('/', function(req, res){
  res.send(submissionsObj)
});

router.get('/:submission', function(req, res){
  var submissions = submissionsObj.submissions;

  for(var i=0; i<submissions.length; i++){
    if(submissions[i].id === req.params.submission){
      return res.send(submissions[i]);
    }
  }

  res.status(404).end();
});

router.use('/:submission/progress', progressRoute);
router.use('/:submission/edits', editRoute);
router.use('/:submission/sign', signRoute);

module.exports = router;
