var React = require('react');
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
    return <div className="ResubmitComponent"><CbLink text='Resubmit' callback={router.resubmit}/> - Resubmitting will allow you to correct any errors or invalid data encountered. Each error report will be saved so you can track your progress after resubmission.</div>
  },

  EditReportsComponent: function(){
    return (
      <ul className="EditReportsWrapper">
        {this.state.editReports.map(function(report, i){
          return (
            <li key={i} className="EditReport">
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
        statusText = <div className="fiStatusText"><CbLink text="Begin filing now" callback={router.beginFiling}/>.</div>
        break;
      case 1:
        statusText = <div className="fiStatusText">Your file is being processed. You can <CbLink text="view progress" callback={router.showProgress.bind(null, this.props.institution)}/>.</div>
        break;
      case 2:
        statusText = <div className="fiStatusText">All checks complete, but <CbLink text="with errors" callback={router.showErrors.bind(null, this.props.institution)}/>. These errors must be corrected before verifying data quality.</div>
        resubmit = this.ResubmitComponent()
        editReports = this.EditReportsComponent()
        break;
      case 3:
        statusText = <div className="fiStatusText">All checks complete. <CbLink text="Verify quality and macro checks" callback={router.showErrors.bind(null, this.props.institution)}/>.</div>
        break;
      case 4:
        statusText = <div className="fiStatusText">All checks and verification complete. <CbLink text="View the summary report" callback={router.showSummary}/> or <CbLink text="sign and submit" callback={router.showSignature}/>.</div>
        break;
      case 5:
        statusText = <div className="fiStatusText">All checks complete, verified, and signed. <CbLink text="View the summary report" callback={router.showSummary}/>.</div>
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
      <div className="fiStatusWrapper">
        {statusText}
        {resubmit}
        {editReports}
      </div>
    )
  },

  render: function(){
    return (
      <div className="FiStatus">
        <h3 className="FiStatusHeader">{this.props.institution.name}</h3>
        <div className="FiStatusStartTime">{this.getStartTime(this.props.institution.editReports[0])}</div>
        {this.getStatusText(this.state.status)}
      </div>
    )
  }
});

module.exports = FiStatus;
