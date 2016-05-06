var React = require('react');
var Link = require('react-router').Link;
var Resubmit = require('./Resubmit.jsx');
var EditReports = require('./EditReports.jsx');


var InstitutionStatus = React.createClass({

  propTypes: {
    institution: React.PropTypes.object.isRequired
  },

  getStatusText: function(statusCode){
    var statusText = null;
    var resubmit = null;
    var editReports = null;

    switch(statusCode){
      case 0:
        statusText = <p><Link to={'/upload/' + this.props.institution.name}>Begin filing now</Link>.</p>
        break;
      case 1:
        statusText = <p>Your file is being processed. You can <Link to={'/progress/' + this.props.institution.name}>view progress</Link>.</p>
        break;
      case 2:
        statusText = <p>All checks complete, but with <Link to={'/edits/' + this.props.institution.name + '#syntactical'}>syntactical</Link> and <Link to={'/edits/' + this.props.institution.name + '#validity'}>validity</Link> errors. These errors must be corrected before verifying data quality.</p>
        break;
      case 3:
        statusText = <p>All checks complete. <Link to={'/errors/' + this.props.institution.name}>Verify quality and macro checks</Link>.</p>
        break;
      case 4:
        statusText = <p>All checks and verification complete. <Link to={'/summary/' + this.props.institution.name}>View the summary report</Link> or <Link to={'/sign/' + this.props.institution.name}>sign and submit</Link>.</p>
        break;
      case 5:
        statusText = <p>All checks complete, verified, and signed. <Link to={'/summary/' + this.props.institution.name}>View the summary report</Link>.</p>
        break;
      default:
        throw new Error('Unexpected institution status');
    }

    if(statusCode > 1){
      editReports = <EditReports {...this.props}/>;
      if(statusCode < 5){
        resubmit = <Resubmit {...this.props}/>;
      }
    }

    return (
      <div>
        {statusText}
        {resubmit}
        {editReports}
      </div>
    )
  },

  render: function(){
    return (
      <div className="InstitutionStatus">
        <h3>{this.props.institution.name}</h3>
      </div>
    )
  }
});

module.exports = InstitutionStatus;
