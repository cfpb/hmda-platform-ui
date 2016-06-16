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
    if(this.props.updateGrouping) this.props.updateGrouping(newGrouping);
  },

  render: function(){
    return (
      <div onClick={this.toggleGrouping} className="EditsSelector btn">
        {'Group by ' + (this.state.groupByRow ? 'edit type' : 'row')}
      </div>
    )
  }

});

module.exports = EditsSelector;
