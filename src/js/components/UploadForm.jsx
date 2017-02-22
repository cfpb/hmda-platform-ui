import React, { Component, PropTypes } from 'react'
import ValidationProgress from './ValidationProgress.jsx'
import Dropzone from 'react-dropzone'

class Upload extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    let upload = this.props.errors.length === 0 ? 'Upload' : 'Can\'t upload'
    this.dropzoneContent.innerHTML = `<p>${upload} "${this.props.file.name}".</p><p>Drag another LAR file to this area or click to select a LAR file to upload.</p>`
  }

  // keeps the info about the file after leaving /upload and coming back
  componentDidMount() {
    let upload = this.props.errors.length === 0 ? 'Upload' : 'Can\'t upload'
    if(this.props.file && 'name' in this.props.file) {
      this.dropzoneContent.innerHTML = `<p>${upload} "${this.props.file.name}".</p><p>Drag another LAR file to this area or click to select a LAR file to upload.</p>`
    }
  }

  renderValidationProgress(props) {
    if(props.code === 1) return null
    return <ValidationProgress code={props.code} />
  }

  renderErrors(errors) {
    if(errors.length === 0) return null

    return(
      <div className="usa-alert usa-alert-error" role="alert">
        <div className="usa-alert-body">
          <ul className="usa-alert-text">
            {errors.map((error, i) => {
              return(<li key={i}>{error}</li>)
            })}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const isUploadDisabled = (this.props.code > 1 || this.props.file === null || this.props.file.name === 'No file chosen' || this.props.errors.length !== 0) ? true : false
    const inputError = (this.props.errors.length === 0) ? '' : 'input-error'

    return (
      <div>
        <div className="UploadForm">
          {this.getErrors(this.props.errors)}
          <form className="usa-form" encType="multipart/form-data" onSubmit={e => this.props.handleSubmit(e, this.props.file)}>
            <div className="container-upload">
              <Dropzone
                onDrop={this.props.setFile}
                multiple={false}
                className='dropzone'
                inputProps={{disabled: true}}>
                <div
                  ref={(node) => {this.dropzoneContent = node}}
                  className="usa-text-small">
                  <p>Drag your LAR file to this area or click to select a LAR file to upload.</p>
                </div>
              </Dropzone>
            </div>
            <input disabled={isUploadDisabled} className="usa-button" id="uploadButton" name="uploadButton" type="submit" value="Upload"></input>
          </form>
          {this.renderValidationProgress(this.props)}
        </div>
      </div>
    )
  }
}

Upload.propTypes = {
  handleSubmit: PropTypes.func,
  setFile: PropTypes.func,
  uploading: PropTypes.bool,
  file: PropTypes.object,
  code: PropTypes.number,
  errors: PropTypes.array
}

Upload.defaultProps = {
  file: {
    name: 'No file chosen'
  },
  errors: []
}

export default Upload
