var React = require('react');
var Link = require('react-router').Link;
var Resubmit = require('./Resubmit.jsx');
var EditReports = require('./EditReports.jsx');


var InstitutionStatus = React.createClass({

  propTypes: {
    institution: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return this.props.institution;
  },

  getStartTime: function(editReport){
    if(!editReport) return;
    var startTime = editReport.timestamp;
    var filingString = 'Filing started ';
    var timeSince = Date.now() - startTime;
    var num;
    var unit = ' minutes';

    if(timeSince < 60000) return filingString + 'just now.';

    if(timeSince >= 86000000) return filingString + 'on ' + new Date(startTime).toString().split(' ').splice(1, 3).join(' ') + '.';

    if(timeSince >= 3600000){
      unit = ' hours';
      num = timeSince/3600000 >> 0
    }else{
      num = timeSince/60000 >> 0
    }

    if(num === 1) unit = unit.slice(0, -1);

    return filingString + num + unit + ' ago.'
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
        statusText = <p>All checks complete, but with <Link to={'/errors/' + this.props.institution.name + '/syntactical'}>syntactical</Link> and <Link to={'/errors/' + this.props.institution.name + '/validity'}>validity</Link> errors. These errors must be corrected before verifying data quality.</p>
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
        <h5>{this.getStartTime(this.props.institution.editReports[0])}</h5>
        {this.getStatusText(this.state.status)}
      </div>
    )
  }
});

module.exports = InstitutionStatus;
