var React = require('react');
var UploadForm = require('./UploadForm.jsx');
var EditsContainer = require('./EditsContainer.jsx')

function uploadCb(){
  console.log('submited, -> transition');
}

var SubmissionContainer = React.createClass({

  render: function() {
    return (
      <div className="SubmissionContainer">
        <UploadForm url="/submit" callback={uploadCb}/>
        <EditsContainer/>
      </div>
    )
  }
});

module.exports = SubmissionContainer;
