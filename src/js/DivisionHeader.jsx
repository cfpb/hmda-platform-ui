var React = require('react');
var DivisionHeader = React.createClass({
  render: function(){
    return <h2 className="DivisionHeader">{this.props.text}</h2>
  }
});

module.exports = DivisionHeader;
