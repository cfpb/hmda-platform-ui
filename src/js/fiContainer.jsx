var React = require('react');
var divisionHeader = require('./divisionHeader.jsx');
var fiStatus = require('./fiStatus.jsx');

var fiContainer = React.createClass({

  getInitialState: function(){
    return this.updateDivisions(this.props.institutions);
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
      <div id="fiContainer">
        {this.state.divisions.map(function(division, i){
          var header = null;
          if(division.institutions.length) header = React.createElement(divisionHeader, {text: division.text});
          return (
            <div key={i} className="divisionWrapper">
              {header}
              {division.institutions.map(function(institution, i){
                return React.createElement(fiStatus, {key: i, institution: institution});
              })}
            </div>
          )
         })
        }
      </div>
    )
  }
});

module.exports = fiContainer;
