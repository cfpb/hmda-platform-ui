var React = require('react');
var api = require('./api');
var UploadForm = require('./UploadForm.jsx');
var EditsContainer = require('./EditsContainer.jsx');
var IRSReport = require('./IRSReport.jsx');
var Signature = require('./Signature.jsx');

function uploadCb(){
  console.log('submited, -> transition');
}

var SubmissionContainer = React.createClass({

  // check state and render Uploadform, edits, summary, irs, sign based on state

  getDefaultProps: function(){
    return {institution: {}};
  },

  getInitialState: function(){
    return {
      status: this.props.institution.status,
      timestamp: this.props.institution.timestamp,
      receipt: this.props.institution.receipt
    }
  },

  componentWillMount: function(){
    //long-poll on progress, eventually.
    if(this.state.status === undefined){
      var self = this;
      api.getInstitution(function(institutionObj){
        self.setState({
          status: institutionObj.status,
          timestamp: institutionObj.timestamp,
          receipt: institutionObj.receipt
        });
      });
    }
  },

  toggleIRSCheck: function(e){
    var self = this;
    api.postIRS(api.makeUrl(api.parseLocation()) + '/irs',
      function(checked){
        self.setState(checked);
      },
      {
        verified: e.target.checked
      });
  },

  toggleSignature: function(e){
    var self = this;
    api.postSignature(api.makeUrl(api.parseLocation()) + '/sign',
      function(checked){
        self.setState(checked);
      },
      {
        signed: e.target.checked
      });
  },

  statusFilter: function(){
    var uploadForm = <UploadForm callback={uploadCb}/>;
    var progress = null;
    var editsContainer = null;
    var summary = null;
    var irs = null;
    var sign = null;

    var status = this.state.status;
    if(!status) return null;

    var code = status.code;

    if(code === null){
      return (
        <div className="SubmissionContainer">
          <p>{status.message}</p>
        </div>
      )
    }

    if(code > 3) progress = <p>Progress component goes here</p>

    if(code > 5) editsContainer = <EditsContainer/>

    if(code > 9) irs = <IRSReport clicked={this.toggleIRSCheck}/>

    if(code > 10){
      irs = <IRSReport clicked={this.toggleIRSCheck} checked='checked'/>
      summary = <p>Summary component here</p>
      sign = <Signature clicked={this.toggleSignature}/>
    }

    if(code > 12){
      sign = <Signature clicked={this.toggleSignature} checked='checked' receipt={this.state.receipt} timestamp={this.state.timestamp}/>
    }

    return (
      <div className="SubmissionContainer container">
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
