var router = require('express').Router();
var yearRouter = require('./years');

router.get('/', function(req, res){
  res.send({institutions: ['inst1', 'inst2']});
});

router.get('/:institution', function(req, res){
  res.send({name: 'some institution', id: req.params.institution})
});

router.use('/year', yearRouter);


module.exports = router;
