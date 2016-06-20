var router = require('express').Router({mergeParams: true});
var progArr = [7, 8, 10];
var codeArr = [4, 6, progArr];
var index = -1;

router.get('/', function(req, res){
  var ind = ++index % 3;
  var code = codeArr[ind]

  if(ind === 2) code = code[req.params.submission -1];
  res.send({
    status: {
      code: code,
      message: ''
    }
  })
});

module.exports = router;
