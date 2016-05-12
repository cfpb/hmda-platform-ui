var superagent = require('superagent');

function makeResponder(cb){
  return function(err, res){
    if(err) return cb(err);
    var obj = JSON.parse(res.text) || {};
    return cb(obj);
  }
}

function getHandler(url, cb, suffix){
  if(typeof url === 'function'){
    cb = url;
    url = makeUrl(suffix);
  }

  superagent.get(url).end(makeResponder(cb));
}

function postHandler(url, cb, suffix){
  if(typeof url === 'function'){
    cb = url;
    url = makeUrl(suffix);
  }

  superagent.post(url).end(makeResponder(cb));
}

function makeUrl(suffix){
  var locationObj = parseLocation();
  var url = '/api'
  if(locationObj.year) url+= '/years/' + locationObj.year;
  if(locationObj.institution) url+= '/institutions/' + locationObj.institution;
  if(locationObj.submission) url+= '/submissions/' + locationObj.submission;
  if(suffix) url += suffix;
  return url;
}

function parseLocation(){
  var pathParts = location.pathname.split('/');
  return {year: pathParts[1], institution:  pathParts[2], submission: pathParts[3]}
 }

module.exports = {

 getInstitutions: function(cb){
   return getHandler('api/institutions', cb);
 },

 getInstitution: function(url, cb){
   return getHandler(url, cb);
 },

 postSubmissions: function(url, cb){
   return postHandler(url, cb, '/submissions');
 },

 getEdits: function(url, cb){
   return getHandler(url, cb, '/edits');
 }
}
