var React = require('react');
var DivisionHeader = require('./DivisionHeader.jsx');
var FiStatus = require('./FiStatus.jsx');

var FiContainer = React.createClass({

  getInitialState: function(){
    return this.updateDivisions(this.props.institutions || []);
  },

  updateDivisions: function(institutions){
    var state = {
      divisions: [
        {text: 'Not Started', institutions: []},
        {text: 'In Progress', institutions: []},
        {text: 'Completed', institutions: []}
      ]
    };

    institutions.forEach(function(institution){
      var status = institution.status;
      var index = 2;

      if(status < 5) index = 1;
      if(status === 0) index = 0;

      state.divisions[index].institutions.push(institution);

    });

    return state;
  },

  updateInstitutions: function(institutions){
    this.setState(this.updateDivisions(institutions));
  },

  render: function() {
    return (
      <div>
        {this.state.divisions.map(function(division, i){
          var header = null;
          if(division.institutions.length) header = <DivisionHeader text={division.text}/>
          return (
            <div key={i} className="division">
              {header}
              {division.institutions.map(function(institution, i){
                return <FiStatus count={i} key={i} institution={institution}/>
              })}
            </div>
          )
         })
        }
      </div>
    )
  }
});

module.exports = FiContainer;
