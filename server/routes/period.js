var fs = require('fs');
var router = require('express').Router({mergeParams: true});
var submissionRouter = require('./submissions');

var institutionsObj = JSON.parse(fs.readFileSync('./server/json/user1-institutions.json'));

router.get('/', function(req, res){
  res.send({periods: ['2017']});
})

router.get('/:period', function(req, res){
  var institutions = institutionsObj.institutions;

  for(var i=0; i<institutions.length; i++){
    if(institutions[i].id === req.params.institution && institutions[i].period === req.params.period){
      return res.send(institutions[i]);
    }
  }
});

router.use('/:period/submissions', submissionRouter);

module.exports = router;
