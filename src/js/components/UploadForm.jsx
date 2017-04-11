import React, { Component, PropTypes } from 'react'
import ValidationProgress from './ValidationProgress.jsx'
import Dropzone from 'react-dropzone'

export const renderValidationProgress = (props) => {
  if(props.code === 1) return null
  return <ValidationProgress code={props.code} />
}

export const renderErrors = (errors) => {
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

export const renderDropText = ({ code, errors, file }, dropzoneContent) => {
  let message = 'Drag your LAR file into this area, or click in this box to select a LAR file to upload.'
  let fileName = null

  if(code > 1) {
    message = 'Drag another LAR file to this area, or click in the box to select a LAR file to upload.'
  }

  if(file) {
    message = `${file.name} is ready for upload.`
    if(errors.length > 0) {
      message = `${file.name} can not be uploaded.`
    }

    if(code > 1) {
      message = `Submission of ${file.name} currently in progess. You can drag another LAR file to this area, or click in the box to select a LAR file to upload..`
    }
  }

  dropzoneContent.innerHTML = `<p>${message}</p>`
}

export default class Upload extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    renderDropText(this.props, this.dropzoneContent)
  }

  // keeps the info about the file after leaving /upload and coming back
  componentDidMount() {
    renderDropText(this.props, this.dropzoneContent)
      if(this.props.code > 2) this.props.pollSubmission()
  }

  render() {
    // handle the onDrop to set the file and show confirmation modal
    // function placed here to have access to this.props
    const onDrop = (acceptedFiles) => {
      const {
        code,
        institutionId,
        filingPeriod,
        showConfirmModal,
        setFile,
        setNewFile
      } = this.props

      if(code > 1) {
        showConfirmModal(institutionId, filingPeriod, code)
        setNewFile(acceptedFiles)
      } else {
        setFile(acceptedFiles)
      }
    }

    const isUploadDisabled = (this.props.code > 1 || this.props.file === null || this.props.file.name === 'No file chosen' || this.props.errors.length !== 0) ? true : false

    return (
      <div>
        <div className="UploadForm">
          {renderErrors(this.props.errors)}
          <form
            className="usa-form"
            encType="multipart/form-data"
            onSubmit={e => this.props.handleSubmit(e, this.props.file)}>
            <div className="container-upload">
              <Dropzone
                disablePreview={true}
                onDrop={onDrop}
                multiple={false}
                className="dropzone">
                <div
                  ref={(node) => {this.dropzoneContent = node}}
                  className="usa-text-small">
                </div>
              </Dropzone>
            </div>
            <input
              disabled={isUploadDisabled}
              className="usa-button"
              id="uploadButton"
              name="uploadButton"
              type="submit"
              value="Upload">
            </input>
          </form>
          {renderValidationProgress(this.props)}
        </div>
      </div>
    )
  }
}

Upload.propTypes = {
  handleSubmit: PropTypes.func,
  setFile: PropTypes.func,
  setNewFile: PropTypes.func,
  showConfirmModal: PropTypes.func,
  pollSubmission: PropTypes.func,
  uploading: PropTypes.bool,
  file: PropTypes.object,
  code: PropTypes.number,
  errors: PropTypes.array,
  institutionId: PropTypes.string,
  filingPeriod: PropTypes.string
}

Upload.defaultProps = {
  file: {
    name: 'No file chosen'
  },
  errors: []
}
