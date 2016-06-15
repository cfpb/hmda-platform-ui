var fs = require('fs');
var router = require('express').Router();

var syntactical = JSON.parse(fs.readFileSync('./server/json/syntactical.json'));
var validity = JSON.parse(fs.readFileSync('./server/json/validity.json'));
var quality = JSON.parse(fs.readFileSync('./server/json/quality.json'));
var macro = JSON.parse(fs.readFileSync('./server/json/macro.json'));

var edits = {
    syntactical: syntactical,
    validity: validity,
    quality: quality,
    macro: macro
  }

var count = 0;

function handlePut(req, res){
  req.body ? count++ : count--;
  var code = count === 5 ? 10 : 9;
  res.send({status:{code: code, message: ''}});
}

router.get('/', function(req, res){
  res.send(edits)
});

router.put('/:edit', handlePut);

router.put('/:edit/lars/:lar', handlePut);

router.get('/:type', function(req, res){
  if(req.params.type === 'lars') return res.sendFile('lars.json', {root: './server/json'});
  res.send(edits[req.params.type]);
});

module.exports = router;
