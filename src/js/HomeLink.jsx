var React = require('react');
var Link = require('react-router').Link;

var HomeLink = React.createClass({
  propTypes: {
    year: React.PropTypes.string.isRequired
  },

  render: function(){
    return <Link className="HomeLink" to={'/' + this.props.year}>Home</Link>
  }
});

module.exports = HomeLink;
