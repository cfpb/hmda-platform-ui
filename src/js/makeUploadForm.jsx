var React = require('react');
var Progress = require('./Progress.jsx');

module.exports = function(url, cb){

  url = url || '/';
  cb = cb || function(){};

  var UploadForm = React.createClass({
    handleSubmit: function(e){
      e.preventDefault();
      this.makeRequest(e);
    },

    setFile: function(e){
      this.setState({uploaded: 0});
      if(!e.target.files) return;
      var file = e.target.files[0];
      console.log('setting file', file);
      this.setState({file: file});
    },

    getInitialState: function(){
      return {uploaded: 0, file: void 0};
    },

    makeRequest: function(e){
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', cb);
      xhr.upload.addEventListener('progress', function(e){
        console.log('progress', e, e.loaded, e.total);
        this.setState({uploaded: e.loaded});
      }.bind(this));

      xhr.open('POST', url);
      xhr.setRequestHeader("Content-Type", "text/data");
      xhr.setRequestHeader("Content-Disposition", "inline; filename=\"" + this.state.file.name + "\"");
      xhr.send(this.state.file);
    },

    getProgress: function(){
      var file = this.state.file;
      var className = '';
      var size = 0;

      if(file) size = file.size;
      else className = 'hidden';

      return (
        <div className={className}>
          <Progress progress={this.state.uploaded} total={size} units="bytes" descriptor="uploaded"/>
        </div>
      )
    },

    render: function(){
      return (
        <div className="full">
          <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <input id="hmdaFile" name="hmdaFile" type="file" onChange={this.setFile}></input>
            <input className="btn" id="uploadButton" name="uploadButton" type="submit" value="Upload"></input>
          </form>
        {this.getProgress()}
        </div>
      )
    }
  });

  return UploadForm;
}
