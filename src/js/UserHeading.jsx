var React = require('react');
var UserHeading = React.createClass({
  render: function(){
    if(!this.props.user) return null;

    var headingText = 'Welcome to ' + this.props.year + ' HMDA filing, ' + this.props.user;

    if (this.props.institution.name) {
      headingText = this.props.user + ' filing in ' + this.props.year + ' on behalf of ' + this.props.institution.name;
    }

    return <h1 className="full">{headingText}</h1>
  }
});

module.exports = UserHeading;
