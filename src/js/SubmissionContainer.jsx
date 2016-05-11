var React = require('react');
var UploadForm = require('./UploadForm.jsx');
var EditsContainer = require('./EditsContainer.jsx')

function uploadCb(){
  console.log('submited, -> transition');
}

var SubmissionContainer = React.createClass({

  // check state and render Uploadform, edits, summary, sign based on state

  getDefaultProps: function(){
    return {institution: {status: void 0}};
  },

  getInitialState: function(){
    return {
      status: this.props.institution.status
    }
  },

  statusFilter: function(){

    var uploadForm = <UploadForm callback={uploadCb}/>;
    var progress = null;
    var editsContainer = null;
    var summary = null;
    var sign = null;

    var code = this.state.status.code;

    if(code === null){
      return (
        <div className="SubmissionContainer">
          <p>{this.state.status.message}</p>
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
