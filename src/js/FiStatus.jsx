var React = require('react');
var Link = require('react-router').Link;
var router = require('./router.js');
var CbLink = require('./CbLink.jsx');


var FiStatus = React.createClass({

  getInitialState: function(){
    return this.props.institution;
  },

  getStartTime: function(editReport){
    if(!editReport) return;
    var startTime = editReport.timestamp;
    var filingString = "Filing started ";
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

  ResubmitComponent: function(){
    return (
      <p className="resubmit">
        <CbLink text='Resubmit' callback={router.resubmit}/> - Resubmitting will allow you to correct any errors or invalid data encountered. Each error report will be saved so you can track your progress after resubmission.
      </p>
    )
  },

  EditReportsComponent: function(){
    return (
      <ul className="reports">
        {this.state.editReports.map(function(report, i){
          return (
            <li key={i}>
              <CbLink text="View edit report" callback={router.showErrors.bind(null, report)}/> - {new Date(report.timestamp).toString().split(' ').splice(1, 3).join(' ')}
            </li>
          )
        })}
      </ul>
    )
  },

  getStatusText: function(statusCode){
    var statusText = null;
    var resubmit = null;
    var editReports = null;

    switch(statusCode){
      case 0:
        statusText = <p><Link to="/upload">Begin filing now</Link>.</p>
        break;
      case 1:
        statusText = <p>Your file is being processed. You can <CbLink text="view progress" callback={router.showProgress.bind(null, this.props.institution)}/>.</p>
        break;
      case 2:
        statusText = <p>All checks complete, but <CbLink text="with errors" callback={router.showErrors.bind(null, this.props.institution)}/>. These errors must be corrected before verifying data quality.</p>
        resubmit = this.ResubmitComponent()
        editReports = this.EditReportsComponent()
        break;
      case 3:
        statusText = <p>All checks complete. <CbLink text="Verify quality and macro checks" callback={router.showErrors.bind(null, this.props.institution)}/>.</p>
        break;
      case 4:
        statusText = <p>All checks and verification complete. <CbLink text="View the summary report" callback={router.showSummary}/> or <CbLink text="sign and submit" callback={router.showSignature}/>.</p>
        break;
      case 5:
        statusText = <p>All checks complete, verified, and signed. <CbLink text="View the summary report" callback={router.showSummary}/>.</p>
        break;
      default:
        throw new Error('Unexpected fi status');
    }

    if(statusCode > 1){
      editReports = this.EditReportsComponent();
      if(statusCode < 5){
        resubmit = this.ResubmitComponent();
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
    var classes = 'institution';
    if (this.props.count !== 0) {
      classes = classes + ' margin-top-3'
    }
    return (
      <div className={classes}>
        <h3 className="margin-bottom-0">{this.props.institution.name}</h3>
        <h5 className="margin-top-0">{this.getStartTime(this.props.institution.editReports[0])}</h5>
        {this.getStatusText(this.state.status)}
      </div>
    )
  }
});

module.exports = FiStatus;
