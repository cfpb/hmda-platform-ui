var React = require('react');
var UserHeading = React.createClass({

  propTypes: {
    user: React.PropTypes.string,
    institution: React.PropTypes.object
  },

  render: function(){
    console.log('test');
    if(!this.props.user) return null;

    var headingText = 'Welcome to HMDA filing, ' + this.props.user;

    if(this.props.institution && this.props.institution.name) {
      headingText = this.props.user + ' filing on behalf of ' + this.props.institution.name;
    }

    return <h1 className="UserHeading full">{headingText}</h1>
  }
});

module.exports = UserHeading;
