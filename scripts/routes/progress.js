var router = require('express').Router();

router.get('/', function(req, res){
  res.send({
    status: 3,
    editCounts: {
      syntactical: 0,
      validity: 1,
      quality: 8,
      macro: 0
    }
  })
});

module.exports = router;
