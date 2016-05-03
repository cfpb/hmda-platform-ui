var fs = require('fs');
var router = require('express').Router();

var syntactical = JSON.parse(fs.readSyncFile('./json/syntactical.json'));
var validity = JSON.parse(fs.readSyncFile('./json/validity.json'));
var quality = JSON.parse(fs.readSyncFile('./json/quality.json'));
var macro = JSON.parse(fs.readSyncFile('./json/macro.json'));

var edits = {
    syntactical: syntactical,
    validity: validity,
    quality: quality,
    macro: macro
  }

router.get('/', function(req, res){
  res.send(edits)
});

router.get('/:type', function(req, res){
  if(req.params.type === 'lars') return res.sendFile('lars.json', {root: './json'});
  res.send(edits[req.params.type]);
});

module.exports = router;
