var React = require('react');
var api = require('./api');
var DivisionHeader = require('./DivisionHeader.jsx');
var InstitutionStatus = require('./InstitutionStatus.jsx');

var InstitutionContainer = React.createClass({

  getInitialState: function(){
    return {
      institutions: []
    }
  },

  componentWillMount: function(){
    var self = this;
    api.getInstitutions(function(instObj){
      self.setState({institutions: instObj.institutions});
    });
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
        {this.getDivisions(this.state.institutions).map(function(division, i){
          var header = null;
          if(division.institutions.length) header = <DivisionHeader>{division.text}</DivisionHeader>
          return (
            <div key={i} className="division">
              {header}
              {division.institutions.map(function(institution, i){
                return <InstitutionStatus key={i} institution={institution} year={self.props.params.year}/>
              })}
            </div>
          )
         })
        }
      </div>
    )
  }
});

module.exports = InstitutionContainer;
