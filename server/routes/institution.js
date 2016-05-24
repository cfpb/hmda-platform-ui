var fs = require('fs');
var router = require('express').Router();
var periodRouter = require('./period');

var institutionsObj = JSON.parse(fs.readFileSync('./server/json/user1-institutions.json'));

router.get('/', function(req, res){
  res.send(institutionsObj);
});

router.get('/:institution', function(req, res){
  var institutions = institutionsObj.institutions;
  var institutionsByPeriod = [];

  for(var i=0; i<institutions.length; i++){
    if(institutions[i].id === req.params.institution){
      return institutionsByPeriod.push(institutions[i]);
    }
  }

  return res.send({institutions:institutionsByPeriod})
});

router.use('/:institution/periods', periodRouter);


module.exports = router;
