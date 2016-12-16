import React, { Component, PropTypes } from 'react'
import Progress from './Progress.jsx'

class Upload extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(){
    if(!this.props.file) this.fileInput.value = ''
  }

  render() {
    return (
    <div className="UploadForm">
      <form className="usa-form" encType="multipart/form-data" onSubmit={e => this.props.handleSubmit(e, this.props.file)}>
        <input id="hmdaFile" name="hmdaFile" type="file" ref={(input) => {this.fileInput = input}} onChange={this.props.setFile}></input>
        <input className="usa-button" id="uploadButton" name="uploadButton" type="submit" value="Upload"></input>
      </form>
      {this.props.file
        ? <Progress progress={this.props.bytesUploaded} total={this.props.file.size} units="bytes" descriptor="uploaded"/>
        : null
      }
    </div>
    )
  }
}

Upload.propTypes = {
  handleSubmit: PropTypes.func,
  setFile: PropTypes.func,
  uploading: PropTypes.bool,
  bytesUploaded: PropTypes.number,
  file: PropTypes.object
}

export default Upload
