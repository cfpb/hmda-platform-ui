var React = require('react');
var api = require('./api');
var UserHeading = require('./UserHeading.jsx');
var UploadForm = require('./UploadForm.jsx');
var ValidationProgress = require('./ValidationProgress.jsx');
var EditsContainer = require('./EditsContainer.jsx');
var IRSReport = require('./IRSReport.jsx');
var Summary = require('./Summary.jsx');
var Signature = require('./Signature.jsx');

var SubmissionContainer = React.createClass({

  // check state and render Uploadform, edits, summary, irs, sign based on state

  getDefaultProps: function(){
    return {institution: {}};
  },

  getInitialState: function(){
    return {
      status: this.props.institution.status
    }
  },

  setAppStatus: function(err, status){
    if(err) return console.log(err);
    //allow richer objects to be directly passed without trimming in the caller
    if(status.status) status = status.status;
    if(status.code !== this.state.status.code) this.setState({status: status})
  },

  componentWillMount: function(){
    if(this.state.status === undefined){
      var self = this;
      api.getInstitution(function(err, institutionObj){
        if(err) return console.log(err);
        self.setState({
          status: institutionObj.status
        });
      });
    }
  },

  statusFilter: function(){
    var uploadForm = <UploadForm setAppStatus={this.setAppStatus}/>;
    var progress = null;
    var editsContainer = null;
    var summary = null;
    var irs = null;
    var sign = null;
    var summary = null;

    var status = this.state.status;
    if(!status) return null;

    var code = status.code;

    if(code === -1){
      return (
        <div className="SubmissionContainer">
          <p>{status.message}</p>
        </div>
      )
    }

    if(code > 2) progress = <ValidationProgress initialCode={code} setAppStatus={this.setAppStatus}/>

    if(code > 6) editsContainer = <EditsContainer setAppStatus={this.setAppStatus}/>

    if(code > 9) irs = <IRSReport checked={false} setAppStatus={this.setAppStatus}/>

    if(code > 10){
      irs = <IRSReport clicked={this.toggleIRSCheck} checked='checked'/>
      summary = <Summary/> // TODO: will have a prop added
      sign = <Signature clicked={this.toggleSignature}/>
    }

    if(code > 12){
      sign = <Signature checked={true} setAppStatus={this.setAppStatus}/>
    }
    return (
      <div className="SubmissionContainer container">
        <UserHeading userName={this.props.userName} period={this.props.params.period} institution={this.props.params.institution}/>
        {uploadForm}
        <div className="third">
          {progress}
        </div>
        <div className="two-third">
          {editsContainer}
          {irs}
          {summary}
          {sign}
        </div>
      </div>
    )
  },

  render: function(){
    return this.statusFilter();
  }
});

module.exports = SubmissionContainer;
