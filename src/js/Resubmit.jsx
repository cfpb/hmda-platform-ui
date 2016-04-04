var React = require('react');
var Link = require('react-router').Link;

var Resubmit = React.createClass({
  propTypes: {
    institution: React.PropTypes.object.isRequired
  },

  handleClick: function(){
    /*API call to cancel in-flight validation*/
  },

  getURI: function(){
    return '/upload/' + this.props.institution.name;
  },

  render: function(){
    return (
      <p className="Resubmit">
        <Link to={this.getURI()} onClick={this.handleClick}>Resubmit</Link> - Resubmitting will allow you to correct any errors or invalid data encountered. Each error report will be saved so you can track your progress after resubmission.
      </p>
    )
  }
});


module.exports = Resubmit;
