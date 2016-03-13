var React = require('react');

var userSelect = React.createClass({
  render: function(){
    return (
      <select onChange={this.props.callback}>
        <option value="user1">user1</option>
        <option vakue="user2">user2</option>
      </select>
    )
  }
});

module.exports = userSelect;
