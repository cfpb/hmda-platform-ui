var fs = require('fs');
var router = require('express').Router({mergeParams: true});
var editRoute = require('./edits');
var irsRoute = require('./irs');
var signRoute = require('./sign');
var summaryRoute = require('./summary');

var submissionsObj = JSON.parse(fs.readFileSync('./server/json/submissions.json'));

var requestCount = 0;
var statusCodes = [3, 4, 7, 8];

function patchCode(submission){
  submission = JSON.parse(JSON.stringify(submission));
  submission.status.code = statusCodes[++requestCount%4];
  return submission;
}

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

  if(req.params.submission === 'latest'){
    return res.send(
      submissions.sort(function(a, b){
        return +a.id - +b.id;
      })[submissions.length - 1]
    )
  }

  for(var i=0; i<submissions.length; i++){
    if(submissions[i].id === req.params.submission){
      return res.send(patchCode(submissions[i]));
    }
  }

  res.status(404).end();
});

router.post('/:submission', function (req, res) {
  req.on('data', function(d){console.log(d.length)});
  req.on('end', function(){
    res.status(202).end();
  });
});

router.use('/:submission/edits', editRoute);
router.use('/:submission/irs', irsRoute);
router.use('/:submission/sign', signRoute);
router.use('/:submission/summary', summaryRoute);

module.exports = router;
