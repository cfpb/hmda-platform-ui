var fs = require('fs');
var router = require('express').Router({mergeParams: true});
var editRoute = require('./edits');
var irsRoute = require('./irs');
var signRoute = require('./sign');
var summaryRoute = require('./summary');

var filingsObj = JSON.parse(fs.readFileSync('./server/json/filings.json'));
var filings = filingsObj.filings;

var requestCount = -1;
var finalCodeCount = -1;
var finalCode = [8, 8, 9];
var statusCodes = [3, 4, 5, 6, finalCode];
var currentSubmission = 0;


function getSubmissions(req){
  for(var i=0; i<filings.length; i++){
    if(filings[i].filing.institutionId === req.params.institution &&
       filings[i].filing.period === req.params.filing){
         return filings[i].submissions
    }
  }
  return [];
}


function patchCode(submission){
  submission = JSON.parse(JSON.stringify(submission));
  var code = statusCodes[++requestCount%5];
  if(typeof code === 'object') code = code[++finalCodeCount%3];
  submission.status.code = code

  return submission;
}


router.get('/', function(req, res){
  res.send(getSubmissions(req));
});

router.post('/', function(req, res){
  var submissions = getSubmissions(req);
  var maxId = submissions.reduce((prev, curr) => {
    return +curr.id > +prev ? +curr.id : prev
  }, 0)

  var newSub = {
    id: (maxId+1)+'',
    status: {
      code: 1,
      message: ''
    }
  }

  submissions.push(newSub)
  res.status(201).send(newSub)
});

router.get('/:submission', function(req, res){
  var submissions = getSubmissions(req);

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
    console.log('upload received')
    res.status(202).end();
  });
});

router.use('/:submission/edits', editRoute);
router.use('/:submission/irs', irsRoute);
router.use('/:submission/sign', signRoute);
router.use('/:submission/summary', summaryRoute);

module.exports = router;
