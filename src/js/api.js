var superagent = require('superagent');

function makeResponder(cb){
  return function(err, res){
    if(err) return cb(err);
    var obj = JSON.parse(res.text) || {};
    return cb(null, obj);
  }
}

function getHandler(url, cb, suffix){
  if(typeof url === 'function'){
    cb = url;
    url = makeUrl(parseLocation(), suffix);
  }

  superagent.get(url).end(makeResponder(cb));
}

function postHandler(url, cb, suffix, postData){
  if(typeof url === 'function'){
    postData = cb
    cb = url;
    url = makeUrl(parseLocation(), suffix);
  }

  var post = superagent.post(url);
  if(postData) post.send(postData);
  post.end(makeResponder(cb));
}

function makeUrl(obj, suffix){
  var url = '/api'
  if(obj.id) url+= '/institutions/' + obj.id;
  if(obj.period) url+= '/periods/' + obj.period;
  if(obj.submission) url+= '/submissions/' + obj.submission;
  if(suffix) url += suffix;
  return url;
}

function parseLocation(){
  var pathParts = location.pathname.split('/');
  return {id: pathParts[1], period: pathParts[2], submission: pathParts[3]}
 }

module.exports = {

 getInstitutions: function(cb){
   return getHandler('api/institutions', cb);
 },

 getInstitution: function(url, cb){
   return getHandler(url, cb);
 },

 getProgress: function(url, cb){
   return getHandler(url, cb, '/progress');
 },

 getIRS: function(url, cb){
  return getHandler(url, cb, '/irs');
 },

 postIRS: function(url, cb, data){
  return postHandler(url, cb, '/irs', data);
 },

 postSignature: function(url, cb, signed){
  return postHandler(url, cb, '', signed);
 },

 postSubmissions: function(url, cb){
   return postHandler(url, cb, '/submissions');
 },

 getEditsByType: function(url, cb){
   return getHandler(url, cb, '/edits');
 },

 getEditsByRow: function(url, cb){
   return getHandler(url, cb, '/edits/lars');
 },

 putEdit: function(edit, loanId, data, cb){
    var suffix = 'edits/' + edit;
    if(loanId) suffix += '/lars/' + loanId;
    var url = makeUrl(parseLocation(), suffix);

    var put = superagent.put(url);
    put.send(data);
    put.end(makeResponder(cb));
 },

 makeUrl: makeUrl,

 parseLocation: parseLocation
}
