var React = require('react');
var Link = require('react-router').Link;
var Resubmit = require('./Resubmit.jsx');

var InstitutionStatus = React.createClass({

  propTypes: {
    institution: React.PropTypes.object.isRequired
  },

  getStatusText: function(statusCode){
    var year = this.props.year;
    var id = this.props.institution.id;
    var appLink = '/' + year + '/' + id;
    var statusLink = <Link to={appLink}>View filing status</Link>
    var statusText = null;
    var resubmit = <Resubmit institution={this.props.institution}/>;

    switch(statusCode){
      case 0:
        statusLink = <Link to={appLink}>Begin filing</Link>
        resubmit = null;
        break;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        statusText = <p>Your file is being processed.</p>
        break;
      case 7:
        statusText = <p>All checks complete, but with syntactical and validity edits. These edits must be corrected before verifying data quality.</p>
        break;
      case 8:
        statusText = <p>All checks complete. You must verify quality and macro edits before continuing.</p>
        break;
      case 9:
      case 10:
        statusText = <p>All checks and verification complete. Review the summary report and sign the submission.</p>
        break;
      case 11:
        statusText = <p>All checks complete, verified, and signed.</p>
        statusLink = <Link to={appLink}>View completed filing</Link>
        break;
      default:
        throw new Error('Unexpected institution status');
    }


    return (
      <div>
        {statusText}
        {statusLink}
        {resubmit}
      </div>
    )
  },

  render: function(){
    return (
      <div className="InstitutionStatus">
        <h3>{this.props.institution.name}</h3>
        {this.getStatusText(this.props.institution.status.code)}
      </div>
    )
  }
});

module.exports = InstitutionStatus;
