var React = require('react');

var UserSelect = React.createClass({
  render: function(){
    return (
      <select onChange={this.props.callback}>
        <option value="Pick a user">Pick a user</option>
        <option value="user1">user1</option>
        <option value="user2">user2</option>
      </select>
    )
  }
});

module.exports = UserSelect;
