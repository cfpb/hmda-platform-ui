var fs = require('fs');
var router = require('express').Router({mergeParams: true});

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

var qualityCount = 1;
var qualityTotal = 2;

var requestCount = -1;

var macroEdits = {};

function handlePut(req, res){
  if(req.body.verified !== undefined) req.body.verified ? qualityCount++ : qualityCount--;
  if(req.body.justifications) macroEdits[req.body.edit] = req.body;
  console.log(req.body);

  var code = getCode();
  res.send({status:{code: code, message: ''}});
}

function getCode(){
  var qualityComplete = qualityCount === qualityTotal;
  var macroComplete = checkMacro();

  return qualityComplete && macroComplete ? 10 : 8;
}

function checkMacro(){
  return 6 === Object.keys(macroEdits).reduce(function(prevCount, edit){
    return prevCount + macroEdits[edit].justifications.reduce(function(prevCount, justification){
      return prevCount + justification.selected
    }, 0)
  }, 0)
}

router.get('/', function(req, res){
  var currEdits = JSON.parse(JSON.stringify(edits));
  var currRequest = ++requestCount % 3;

  if(currRequest >= 1){
    currEdits.syntactical = noSyntactical;
    currEdits.validity = noValidity;
  }
  if(currRequest === 2){
    currEdits.quality = noQuality;
    currEdits.macro = noMacro;
  }

  qualityCount = 1;
  macroEdits = {};
  res.send(currEdits)
});

router.put('/:edit', handlePut);

router.put('/:edit/lars/:lar', handlePut);

router.get('/:type', function(req, res){
  if(req.params.type === 'lars') return res.sendFile('lars.json', {root: './server/json'});
  res.send(edits[req.params.type]);
});

module.exports = router;
