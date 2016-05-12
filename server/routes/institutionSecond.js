var fs = require('fs');
var router = require('express').Router();
var submissionRouter = require('./submissions');

var institutionsObj = JSON.parse(fs.readFileSync('./server/json/user1-institutions.json'));

router.get('/', function(req, res){
  res.send(institutionsObj);
});

router.get('/:institution', function(req, res){
  var institutions = institutionsObj.institutions;

  for(var i=0; i<institutions.length; i++){
    if(institutions[i].id === req.params.institution){
      return res.send(institutions[i]);
    }
  }

  res.status(404).end();
});

router.post('/:institution', function (req, res) {
  res.status(202).send({
    id: 1,
    progress: req.url + '/submissions/1/progress'
  });
});

router.use('/:institution/submissions', submissionRouter);


  module.exports = router;
