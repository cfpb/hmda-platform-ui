var React = require('react');
var fiHeader = require('./fiHeader.jsx');
var fiStatus = require('./fiStatus.jsx');

var fiContainer = React.createClass({

  getInitialState: function(){
    var initialState = {
      divisions: [
        {text: 'Not Started', institutions: []},
        {text: 'In Progress', institutions: []},
        {text: 'Completed', institutions: []}
      ]
    };

    this.props.institutions.forEach(function(institution){
      var status = institution.status;
      var index = 2;

      if(status < 5) index = 1;
      if(status === 0) index = 0;

      initialState.divisions[index].institutions.push(institution);
    });

    return initialState;
  },

  render: function() {
    return (
      <div id="fiContainer">
        {this.state.divisions.map(function(division, i){
          var header = null;
          if(division.institutions.length) header = React.createElement(fiHeader, {text: division.text});
          return (
            <div key={i} className="fiWrapper">
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
