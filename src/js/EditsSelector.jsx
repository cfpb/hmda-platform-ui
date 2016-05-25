var React = require('react');

var EditsSelector = React.createClass({

  getInitialState: function(){
    return {groupByRow: false};
  },

  componentWillMount: function(){
    this.selectGrouping(false);
  },

  selectGrouping: function(newGrouping){
    this.setState({groupByRow: newGrouping}); 
    if(this.props.callback) callback(newGrouping);
  },

  render: function(){
    return (
      <div onClick={this.selectGrouping(!this.state,groupByRow)} className="EditSelector">
        {'Group by ' + this.state.groupByRow?'row':'edit type'}
      </div>
    )
  }

});

module.exports = EditsSelector;
