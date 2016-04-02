var React = require('react');

var UserSelect = React.createClass({
  propTypes:{
    callback: React.PropTypes.func.isRequired
  },

  render: function(){
    return (
      <select style={{position:'absolute', top:'6px', left: '8px'}} className="UserSelect" onChange={this.props.callback}>
        <option value="Pick a user">Pick a user</option>
        <option value="user1">user1</option>
        <option value="user2">user2</option>
      </select>
    )
  }
});

module.exports = UserSelect;
