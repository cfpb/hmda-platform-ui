import React, { Component, PropTypes } from 'react'

class Upload extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    this.fileName.value = this.props.file.name
  }

  // keeps the filename after leaving /upload and coming back
  componentDidMount() {
    if(this.props.file && 'name' in this.props.file) {
      this.fileName.value = this.props.file.name
    }
  }

  render() {
    console.log('UploadForm')
    console.log(this.props)
    const isDisabled = (this.props.code > 1) ? true : false

    return (
    <div className="UploadForm">
      <form className="usa-form" encType="multipart/form-data" onSubmit={e => this.props.handleSubmit(e, this.props.file)}>
        <div className="hmda-file-input usa-button usa-button-gray">
          <label htmlFor="hmdaFile">Select a file</label>
          <input id="hmdaFile" name="hmdaFile" type="file" ref={(input) => {this.fileInput = input}} onChange={this.props.setFile}></input>
        </div>
        <input id="hmdaFileName" name="hmdaFileName" type="text" value='No file chosen' ref={(input) => {this.fileName = input}} readOnly disabled></input>
        <input disabled={isDisabled} className="usa-button" id="uploadButton" name="uploadButton" type="submit" value="Upload"></input>
      </form>
    </div>
    )
  }
}

Upload.propTypes = {
  handleSubmit: PropTypes.func,
  setFile: PropTypes.func,
  uploading: PropTypes.bool,
  file: PropTypes.object,
  code: PropTypes.number
}

Upload.defaultProps = {
  file: {
    name: 'No file chosen'
  }
}

export default Upload
