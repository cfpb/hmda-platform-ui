var React = require('react');
var Link = require('react-router').Link;

var HomeLink = React.createClass({

  render: function(){
    return <Link className="HomeLink" to='/'>Home</Link>
  }
});

module.exports = HomeLink;
