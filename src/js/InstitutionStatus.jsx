var React = require('react');
var Link = require('react-router').Link;
var api = require('./api')
var Resubmit = require('./Resubmit.jsx');

var InstitutionStatus = React.createClass({

  propTypes: {
    institution: React.PropTypes.object.isRequired,
    year: React.PropTypes.string.isRequired
  },

  checkSubmission: function(){
    if(this.props.institution.currentSubmission === 0){
      var year = this.props.year;
      var id = this.props.institution.id;
      api.postSubmissions('/api/years/' + year + '/institutions/' + id + '/submissions', function(subObj){console.log(subObj)});
    }
  },

  getStatusText: function(statusCode){
    var year = this.props.year;
    var id = this.props.institution.id;
    var submission = this.props.institution.currentSubmission;
    var submissionRoute = submission === 0 ? 1 : submission;
    var appLink = '/' + year + '/' + id + '/' + submissionRoute;
    var statusLink = <Link to={appLink}>View filing status</Link>
    var statusText = null;
    var resubmit = <Resubmit year={year} id={id} submission={+submission + 1}/>;

    switch(statusCode){
      case -1:
        statusText = <p>{this.props.institution.status.message}</p>
        statusLink = null;
        break;
      case 0:
        statusLink = <Link to={appLink} onClick={this.checkSubmission}>Begin filing</Link>
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
        statusLink = <Link to={appLink}>Sign your filing</Link>
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
