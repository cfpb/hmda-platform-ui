var React = require('react');

var EditsSelector = React.createClass({

  getInitialState: function(){
    return {groupByRow: true};
  },

  componentWillMount: function(){
    this.toggleGrouping();
  },

  toggleGrouping: function(){
    var newGrouping = !this.state.groupByRow
    this.setState({groupByRow: newGrouping});
    if(this.props.callback) this.props.callback(newGrouping);
  },

  render: function(){
    return (
      <div onClick={this.toggleGrouping} className="EditsSelector">
        {'Group by ' + this.state.groupByRow ? 'row' : 'edit type'}
      </div>
    )
  }

});

module.exports = EditsSelector;
