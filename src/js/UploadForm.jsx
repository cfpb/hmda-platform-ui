var React = require('react');
var Progress = require('./Progress.jsx');
var api = require('./api');

var UploadForm = React.createClass({
  propTypes: {
    appStatus: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
    submission: React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      submission: '1'
    }
  },

  handleSubmit: function(e){
    e.preventDefault();
    if(!this.state.file) return;
    this.makeRequest(e);
  },

  handleLoad: function(e){
    if(e.target.status !== 202) return this.props.appStatus.set({code: -1, message: 'Error uploading file'});
    this.props.appStatus.set(null, {code: 3, message: ''});
  },

  setFile: function(e){
    this.setState({uploaded: 0});
    if(!e.target.files) return;
    var file = e.target.files[0];
    this.setState({file: file});
  },

  getInitialState: function(){
    return {uploaded: 0, file: void 0};
  },

  componentWillReceiveProps: function(newProps){
    if(this.props.submission !== newProps.submission){
      this.setState({uploaded: 0, file: void 0});
      this.form.reset();
    }
  },

  makeRequest: function(){
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', this.handleLoad);
    xhr.upload.addEventListener('progress', function(e){
      this.setState({uploaded: e.loaded});
    }.bind(this));

    xhr.open('POST', api.makeUrl(api.parseLocation()));
    xhr.setRequestHeader('Content-Type', 'text/data');
    xhr.setRequestHeader('Content-Disposition', 'inline; filename="' + this.state.file.name + '"');
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
    var self = this;
    return (
      <div className="UploadForm full">
        <form encType="multipart/form-data" onSubmit={this.handleSubmit} ref={function(form){self.form = form}}>
          <input id="hmdaFile" name="hmdaFile" type="file" onChange={this.setFile}></input>
          <input className="btn" id="uploadButton" name="uploadButton" type="submit" value="Upload"></input>
        </form>
      {this.getProgress()}
      </div>
    )
  }
});

module.exports = UploadForm;
