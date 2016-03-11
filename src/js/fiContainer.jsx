var React = require('react');
var fiHeader = require('./fiHeader');

var fiContainer = React.createClass({

  getInitialState: function(){
    var initialState = {
      divisions:[
        {text: 'Not Started', institutions: []},
        {text: 'In Progress', institutions: []},
        {text: 'Completed', institutions: []}
      ]
    };

    this.props.institutions.forEach(function(institution){
      var state = institution.state;
      var index = 2;

      if(state < 5) index = 1;
      if(state === 0) index = 0;

      initialState.divisions[index] = institution;
    });

    return initialState;
  },

  render: function() {
    return (
      <div id="fiContainer">
        {this.state.divisions.map(function(division, i){
          return (
            if(division.institutions.length) <fiHeader key={i} text={division.text}/>
            division.institutions.map(function(institution, i){
              return <fiStatus key={i} institution={institution}/>
            });
          )
         });          
        }
      </div>
    )
  }
});

module.exports = fiContainer;
