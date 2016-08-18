var fs = require('fs');
var router = require('express').Router({mergeParams: true});
var submissionRouter = require('./submissions');

var institutionsObj = JSON.parse(fs.readFileSync('./server/json/institutions.json'));

router.get('/', function(req, res){
  res.send({filings: ['2017']});
})

router.get('/:filing', function(req, res){
  var institutions = institutionsObj.institutions;

  for(var i=0; i<institutions.length; i++){
    if(institutions[i].id === req.params.institution && institutions[i].filing === req.params.filing){
      return res.send(institutions[i]);
    }
  }
});

router.use('/:filing/submissions', submissionRouter);

module.exports = router;
