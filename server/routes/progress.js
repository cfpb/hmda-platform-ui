var router = require('express').Router();

router.get('/', function(req, res){
  res.send({
    status: {
      code: 7,
      message: ''
    }
  })
});

module.exports = router;
