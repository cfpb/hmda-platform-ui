var fs = require('fs');
var router = require('express').Router({mergeParams: true});

var syntactical = JSON.parse(fs.readFileSync('./server/json/syntactical.json'));
var validity = JSON.parse(fs.readFileSync('./server/json/validity.json'));
var quality = JSON.parse(fs.readFileSync('./server/json/quality.json'));
var macro = JSON.parse(fs.readFileSync('./server/json/macro.json'));
var q029 = JSON.parse(fs.readFileSync('./server/json/q029.json'));
var q595 = JSON.parse(fs.readFileSync('./server/json/q595.json'));

var edits = {
    syntactical: syntactical,
    validity: validity,
    quality: quality,
    macro: macro,
    q029: q029,
    q595: q595
  }

var noSyntactical = {
  type: 'syntactical',
  edits : []
}

var noValidity = {
  type: 'validity',
  edits : []
}

var noQuality = {
  type: 'quality',
  edits : []
}

var noMacro= {
  type: 'macro',
  edits : []
}

var count = 0;

function handlePut(req, res){
  req.body.verification ? count++ : count--;
  var code = count === 5 ? 10 : 7;
  res.send({status:{code: code, message: ''}});
}

router.get('/', function(req, res){
  var sub = +req.params.submission;

  if(sub > 1){
    edits.syntactical = noSyntactical;
    edits.validity = noValidity;
  }
  if(sub > 2){
    edits.quality = noQuality;
    edits.macro = noMacro;
  }
  count = 0;
  res.send(edits)
});

router.put('/:edit', handlePut);

router.put('/:edit/lars/:lar', handlePut);

router.get('/:type', function(req, res){
  if(req.params.type === 'lars') return res.sendFile('lars.json', {root: './server/json'});
  res.send(edits[req.params.type]);
});

module.exports = router;
