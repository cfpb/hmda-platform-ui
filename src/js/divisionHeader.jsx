var React = require('react');
var divisionHeader = React.createClass({
  render: function(){
    return <h2 className="divisionHeader">{this.props.text}</h2>
  }
});

module.exports = divisionHeader;
