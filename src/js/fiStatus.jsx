var React = require('react');
var api = require('./api');
var cbLink = require('./cbLink.jsx');

function beginFiling(){
  console.log("Begin filing transition");
}

function resubmit(){
  //clear state
  console.log('resubmiting');
}

function viewSummary(){
  console.log('view summary');
}

function sign(){
  console.log('sign');
}

var fiStatus = React.createClass({

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

  resubmitComponent: function(){
    return <div className="resubmitComponent">{React.createElement(cbLink, {text: 'Resubmit', callback: resubmit})} - Resubmitting will allow you to correct any errors or invalid data encountered. Each error report will be saved so you can track your progress after resubmission.</div>
  },

  editReportsComponent: function(){
    return (
      <ul className="editReportsWrapper">
        {this.state.editReports.map(function(report, i){
          return (
            <li key={i} className="editReport">
              {React.createElement(cbLink, {text: "View edit report", callback: api.getErrors.bind(null, report)})} - {new Date(report.timestamp).toString().split(' ').splice(1, 3).join(' ')}
            </li>
          )
        })}
      </ul>
    )
  },

  getStatusText: function(statusCode){
    switch(statusCode){
      case 0:
        return (
          <div className="fiStatusWrapper">
            <div className="fiStatusText">{React.createElement(cbLink, {text: "Begin filing now", callback: beginFiling})}.</div>
          </div>
        )
      case 1:
        return (
          <div className="fiStatusWrapper">
            <div className="fiStatusText">Your file is being processed. You can {React.createElement(cbLink, {text: "view progress", callback: api.getProgress.bind(null, this.props.institution)})}.</div>
          </div>
        )
      case 2:
        return (
          <div className="fiStatusWrapper">
            <div className="fiStatusText">All checks complete, but {React.createElement(cbLink, {text: "with errors", callback: api.getErrors.bind(null, this.props.institution)})}. These errors must be corrected before verifying data quality.</div>
            {this.resubmitComponent()}
            {this.editReportsComponent()}
          </div>
        )
      case 3:
        return (
          <div className="fiStatusWrapper">
            <div className="fiStatusText">All checks complete. {React.createElement(cbLink, {text: "Verify quality and macro checks", callback: api.getErrors.bind(null, this.props.institution)})}.</div>
            {this.resubmitComponent()}
            {this.editReportsComponent()}
          </div>
        )
      case 4:
        return (
          <div className="fiStatusWrapper">
            <div className="fiStatusText">All checks and verification complete. {React.createElement(cbLink, {text: "View the summary report", callback: viewSummary})} or {React.createElement(cbLink, {text: "sign and submit", callback: sign})}.</div>
            {this.resubmitComponent()}
            {this.editReportsComponent()}
          </div>
        )
    case 5:
        return (
          <div className="fiStatusWrapper">
            <div className="fiStatusText">All checks complete, verified, and signed. {React.createElement(cbLink, {text: "View the summary report", callback: viewSummary})}.</div>
            {this.editReportsComponent()}
          </div>
        )
    }
  },

  render: function(){
    return (
      <div className="fiStatus">
        <h3 className="fiStatusHeader">{this.props.institution.name}</h3>
        <div className="fiStatusStartTime">{this.getStartTime(this.props.institution.editReports[0])}</div>
        {this.getStatusText(this.state.status)}
      </div>
    )
  }
});

module.exports = fiStatus;
