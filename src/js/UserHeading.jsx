var React = require('react');
var UserHeading = React.createClass({

  propTypes: {
    user: React.PropTypes.string,
    year: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    institution: React.PropTypes.object
  },

  render: function(){
    if(!this.props.user) return null;

    var headingText = 'Welcome to ' + this.props.year + ' HMDA filing, ' + this.props.user;

    if (this.props.institution.name) {
      headingText = this.props.user + ' filing in ' + this.props.year + ' on behalf of ' + this.props.institution.name;
    }

    return <h1 className="UserHeading full">{headingText}</h1>
  }
});

module.exports = UserHeading;
