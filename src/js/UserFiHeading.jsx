var React = require('react');
var UserFiHeading = React.createClass({
  render: function(){
    var headingText = null;

    if (this.props.institution.name) {
      headingText = this.props.user + ' filing in ' + this.props.year + ' on behalf of ' + this.props.institution.name;
    } else {
      headingText = 'Welcome to ' + this.props.year + ' HMDA filing, ' + this.props.user;
    }

    return <h1>{headingText}</h1>
  }
});

module.exports = UserFiHeading;
