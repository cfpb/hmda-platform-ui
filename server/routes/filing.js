var fs = require('fs');
var router = require('express').Router({mergeParams: true});
var submissionRouter = require('./submissions');

var filingsObj = JSON.parse(fs.readFileSync('./server/json/filings.json'));

router.get('/', function(req, res){
  res.send(filingsObj);
})

router.get('/:filing', function(req, res){
  var filings = filingsObj.filings;

  for(var i=0; i<filings.length; i++){
    if(filings[i].filing.institutionId === req.params.institution &&
       filings[i].filing.period === req.params.filing){
      return res.send(filings[i]);
    }
  }

  res.status(404).end();
});

router.use('/:filing/submissions', submissionRouter);

module.exports = router;
