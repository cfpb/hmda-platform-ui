var React = require('react');
var DivisionHeader = React.createClass({
  render: function(){
    return <h2 className="margin-top-5">{this.props.text}</h2>
  }
});

module.exports = DivisionHeader;
