var React = require('react');
var fiHeader = React.createClass({
  render: function(){
    return <h2 className="fiHeader">{this.props.text}</h2>
  }
});

module.exports = fiHeader;
