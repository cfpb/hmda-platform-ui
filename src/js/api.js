var fs = require('fs');

var data = JSON.parse(fs.readFileSync('../../__tests__/institutions.json'));

module.exports = {
  getInstitutions: function(name, cb){
    return cb(data[name] || []);
  },
  getErrors: function(){console.log('getting errors')},
  getProgress: function(){console.log('getting progress')}
};
