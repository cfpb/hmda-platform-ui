var React = require('react');

var fiHeader = React.createClass({
  render: function(){
    return <h2 className="fiHeader">{this.props.headerText}</h2>
  }
});

module.exports = fiHeader;
