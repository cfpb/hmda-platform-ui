var React = require('react');
var api = require('./api');
var UploadForm = require('./UploadForm.jsx');
var EditsContainer = require('./EditsContainer.jsx')

function uploadCb(){
  console.log('submited, -> transition');
}

var SubmissionContainer = React.createClass({

  // check state and render Uploadform, edits, summary, sign based on state

  getDefaultProps: function(){
    return {institution: {}};
  },

  getInitialState: function(){
    return {
      status: this.props.institution.status
    }
  },

  componentWillMount: function(){
    //long-poll on progress, eventually.
    if(this.state.status === undefined){
      var self = this;
      api.getInstitution(function(institutionObj){
        self.setState({status: institutionObj.status});
      });
    }
  },

  statusFilter: function(){

    var uploadForm = <UploadForm callback={uploadCb}/>;
    var progress = null;
    var editsContainer = null;
    var summary = null;
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

    if(code > 6) editsContainer = <EditsContainer/>

    if(code > 8){
      summary = <p>Summary component here</p>
      sign = <p>Signature component here</p>
    }

    return (
      <div className="SubmissionContainer">
        {uploadForm}
        {progress}
        {editsContainer}
        {summary}
        {sign}
      </div>
    )
  },

  render: function(){
    return this.statusFilter();
  }
});

module.exports = SubmissionContainer;
