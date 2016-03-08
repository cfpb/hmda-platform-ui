var React = require('react');

module.exports = function(url, cb){

  url = url || '/';
  cb = cb || function(){};

  var SubmitForm = React.createClass({
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

    render: function(){
      return (
        <div id="formWrapper">
          <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <input id="hmdaFile" name="hmdaFile" type="file" onChange={this.setFile}></input>
            <input id="uploadButton" name="uploadButton" type="submit" value="Upload"></input>
          </form>
          <UploadTracker uploaded={this.state.uploaded} file={this.state.file}/>
        </div>
      )
    }
  });


  var UploadTracker = React.createClass({
    render: function(){
      var className = '';
      var file = this.props.file;
      var size = 0;
      if(!file){
        className = 'hidden';
      }else{
        size = file.size;
      }
      return (
        <div id="uploadTracker" className={className}>
          <span>{this.props.uploaded} bytes of {size} uploaded</span>
        </div>
      )
    }
  });

  return SubmitForm;
}
