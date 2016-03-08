var React = require('react');
var fiHeader = require('./fiHeader');

var fiContainer = React.createClass({

  getInitialState: function(){
    return {
      divisions:[
        {text: 'Not Started', value: []},
        {text: 'In Progress', value: []},
        {text: 'Completed', value: []}
      ]
    };
  },

  render: function() {
    return (
      <div id="fiContainer">
        {this.state.divisions.map(function(division, i){
          return (
            if(division.value.length) <fiHeader key={i} text={division.text}/>
            division.value.map(function(fi, i){
              return <fiStatus key={i} data={fi}/>
            });
          )
         });          
        }
      </div>
    )
  }
});

module.exports = fiContainer;
