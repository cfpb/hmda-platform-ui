var React = require('react');
var api = require('./api');
var DivisionHeader = require('./DivisionHeader.jsx');
var InstitutionStatus = require('./InstitutionStatus.jsx');

var InstitutionContainer = React.createClass({

  getInitialState: function(){
    return {
      institutionsByPeriod: {}
    }
  },

  componentWillMount: function(){
    var self = this;
    api.getInstitutions(function(instObj){
      self.setState({institutionsByPeriod: self.groupByPeriod(instObj)});
    });
  },

  groupByPeriod: function(instObj){
    var grouped = {};
    
    instObj.institutions.forEach(function(institution){
      if(!grouped[institution.period]) grouped[institution.period] = [];
      grouped[institution.period].push(institution);
    });

    return grouped;
  },

  getDivisions: function(institutions){
    var divisions = [
        {text: 'Not Started', institutions: []},
        {text: 'In Progress', institutions: []},
        {text: 'Completed', institutions: []}
      ];

    institutions.forEach(function(institution){
      var status = institution.status.code;
      var index = 2;

      if(status < 11) index = 1;
      if(status === 0) index = 0;

      divisions[index].institutions.push(institution);

    });

    return divisions;
  },

  render: function(){
    var self = this;
    return (
      <div className="InstitutionContainer half">
        {Object.keys(self.state.institutionsByPeriod).sort().reverse().map(function(period, i){
          var institutions = self.state.institutionsByPeriod[period];
          return (
            <div key={i} className="periodWrapper">
              <h1 className="periodHeader">{period}</h1>
              {self.getDivisions(institutions).map(function(division, i){
               var header = null;
               if(division.institutions.length) header = <DivisionHeader>{division.text}</DivisionHeader>
               return (
                 <div key={i} className="divisionWrapper">
                   {header}
                   {division.institutions.map(function(institution, i){
                     return <InstitutionStatus key={i} institution={institution} period={period}/>
                   })}
                 </div>
               )
              })
              }
           </div>
          )
        })
        }
      </div>
    )
  }
});

module.exports = InstitutionContainer;
