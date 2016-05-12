var superagent = require('superagent');

function makeResponder(cb){
  return function(err, res){
    if(err) return cb(err);
    var obj = JSON.parse(res.text) || {};
    return cb(obj);
  }
}

module.exports = {
 getInstitutions: function(cb){
   superagent.get('api/institutions').end(makeResponder(cb));
 },

 getInstitution: function(cb){
   var locationObj = this.parseLocation();
   superagent.get('/api/years/' + locationObj.year + '/institutions/' + locationObj.institution).end(makeResponder(cb));
 },

 postSubmissions: function(cb){
   var locationObj = this.parseLocation();
   superagent.post( '/api/years/' + locationObj.year + '/institutions/' + locationObj.institution + '/submissions').end(makeResponder(cb));
 },

 getEdits: function(cb){
   var locationObj = this.parseLocation();
   superagent.get('/api/years/' + locationObj.year + '/institutions/' + locationObj.institution + '/submissions/' + locationObj.submission + '/edits').end(makeResponder(cb));
 },

 parseLocation: function(){
   var pathParts = location.pathname.split('/');
   return {year: pathParts[1], institution:  pathParts[2], submission: pathParts[3]}
 }
}
