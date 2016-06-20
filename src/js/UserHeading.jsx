var React = require('react');
var UserHeading = React.createClass({

  propTypes: {
    userName: React.PropTypes.string.isRequired,
    period: React.PropTypes.string.isRequired,
    institution: React.PropTypes.string
  },

  render: function(){
    if(!this.props.userName) return null;

    var headingText = 'Welcome to the ' + this.props.period + ' HMDA filing, ' + this.props.userName;

    if(this.props.institution) {
      headingText = this.props.userName + ' filing on behalf of ' + this.props.institution;
    }

    return <h1 className="UserHeading full">{headingText}</h1>
  }
});

module.exports = UserHeading;
