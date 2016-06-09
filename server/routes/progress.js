var router = require('express').Router();
var codeArr = [4, 6, 7];
var index = -1;

router.get('/', function(req, res){
  res.send({
    status: {
      code: codeArr[++index % 3],
      message: ''
    }
  })
});

module.exports = router;
