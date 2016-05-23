var React = require('react');
var Link = require('react-router').Link;
var api = require('./api');

var Resubmit = React.createClass({
  propTypes: {
    period: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    submission: React.PropTypes.number.isRequired
  },

  handleClick: function(){
    /*API call to cancel in-flight validation*/
    api.postSubmissions(
      api.makeUrl({
        period: this.props.period,
        id: this.props.id
      },'/submissions'),
      function(subObj){console.log(subObj)}
    );
  },

  getRoute: function(){
    return '/' + this.props.id + '/' + this.props.period + '/' + this.props.submission;
  },

  render: function(){
    return (
      <p className="Resubmit">
        <Link to={this.getRoute()} onClick={this.handleClick}>Resubmit</Link> - Resubmitting will allow you to correct any errors or invalid data encountered. Each error report will be saved so you can track your progress after resubmission.
      </p>
    )
  }
});


module.exports = Resubmit;
