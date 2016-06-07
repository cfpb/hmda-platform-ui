var router = require('express').Router();

router.post('/', function (req, res) {
  console.log('sign post');
  console.log(JSON.parse(req.body));
  var state = req.body.signed ? 12 : 11;

  res.status(202).send({
    status: {
      code: state,
      message: ""
    }
  });
});

module.exports = router;
