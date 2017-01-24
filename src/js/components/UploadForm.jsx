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
    const isDisabled = (this.props.code > 1) ? true : false
    const disabledFileInput = (this.props.code > 1) ? 'usa-button-disabled' : ''
    const disabledFileName = (this.props.code > 1) ? 'input-disabled' : ''

    return (
    <div className="UploadForm">
      <form className="usa-form" encType="multipart/form-data" onSubmit={e => this.props.handleSubmit(e, this.props.file)}>
        <div className={`hmda-file-input usa-button usa-button-gray ${disabledFileInput}`}>
          <label htmlFor="hmdaFile">Select a file</label>
          <input id="hmdaFile" name="hmdaFile" type="file" ref={(input) => {this.fileInput = input}} disabled={isDisabled} onChange={this.props.setFile}></input>
        </div>
        <input className={disabledFileName} id="hmdaFileName" name="hmdaFileName" type="text" value='No file chosen' ref={(input) => {this.fileName = input}} readOnly disabled></input>
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
