var data = require('./institutions.js');

module.exports = {
  getInstitutions: function(name, cb){
    return cb(data[name] || []);
  },
  getErrors: function(){console.log('getting errors')},
  getProgress: function(){console.log('getting progress')}
};
