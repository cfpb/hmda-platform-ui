var React = require('react');

var DivisionHeader = React.createClass({
  propTypes: {
    children: React.PropTypes.string.isRequired
  },
  render: function(){
    return <h2 className="DivisionHeader">{this.props.children}</h2>
  }
});

module.exports = DivisionHeader;
