var React = require('react');
var DivisionHeader = React.createClass({
  render: function(){
    return <h2 className="DivisionHeader">{this.props.children}</h2>
  }
});

module.exports = DivisionHeader;
