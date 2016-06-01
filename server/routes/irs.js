var fs = require('fs');
var router = require('express').Router();
var irsObj = JSON.parse(fs.readFileSync('./server/json/irs.json'));

router.get('/', function (req, res) {
  res.send(irsObj);
});

router.post('/:status', function (req, res){
  var newStatus;
  if (req.params.status === '10'){
    newStatus = '11';
  } else {
    newStatus = '10';
  }
  res.status(202).send({
    status: {
      code: newStatus,
      message: ""
    }
  });
});

module.exports = router;
