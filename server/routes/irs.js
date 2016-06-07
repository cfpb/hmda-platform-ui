var fs = require('fs');
var router = require('express').Router();
var irsObj = JSON.parse(fs.readFileSync('./server/json/irs.json'));

router.get('/', function (req, res) {
  res.send(irsObj);
});

router.post('/', function (req, res){
  var state = req.body.verified ? 11 : 10;
  
  res.status(202).send({
    status: {
      code: state,
      message: ""
    }
  });
});

module.exports = router;
