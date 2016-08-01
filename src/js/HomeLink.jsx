var React = require('react');
var Link = require('react-router').Link;

var HomeLink = React.createClass({

  render: function(){
    return <div className="AppContainer">
      <Link className="HomeLink" to='/'>Home</Link><br />
      <img src="/img/ffiec-logo.png" width="150px"/>
    </div>
  }
});

module.exports = HomeLink;
