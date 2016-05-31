var fs = require('fs');
var router = require('express').Router();
var irsObj = JSON.parse(fs.readFileSync('./server/json/irs.json'));

router.get('/', function (req, res) {
  res.send(irsObj);
});

router.post('/:irs', function (req, res){
  console.log(req);
  console.log(res);
  res.status(202).send({

  });
});

module.exports = router;
