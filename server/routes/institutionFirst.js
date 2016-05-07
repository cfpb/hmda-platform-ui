var fs = require('fs');
var router = require('express').Router();
var yearRouter = require('./yearSecond');

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

router.use('/:institution/years', yearRouter);


module.exports = router;
