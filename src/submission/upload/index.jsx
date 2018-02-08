import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ValidationProgress from './ValidationProgress.jsx'
import Dropzone from 'react-dropzone'
import * as STATUS from '../../constants/statusCodes.js'

export const renderValidationProgress = ({
  code,
  errorApp,
  errorUpload,
  file,
  id,
  uploading
}) => {
  if (code < STATUS.UPLOADING && !uploading) return null
  return (
    <ValidationProgress
      code={code}
      errorApp={errorApp}
      errorUpload={errorUpload}
      file={file}
      id={id}
    />
  )
}

const _getUploadMessage = (preText, filename, postText, howToMessage) => {
  return (
    <div>
      <p className="file-selected">{howToMessage}</p>
      <p>
        {preText} <strong>{filename}</strong> {postText}
      </p>
    </div>
  )
}

export const getDropzoneText = ({ code, errors, filename, errorFile }) => {
  let howToMessage =
    'To begin uploading a file, drag it into this box or click here.'
  if (code >= STATUS.CREATED) {
    howToMessage =
      'To begin uploading a new file, drag it into this box or click here.'
  }
  let message = <p>{howToMessage}</p>

  if (code >= STATUS.UPLOADING) {
    message = howToMessage
  }

  if (filename || errorFile) {
    message = _getUploadMessage('', filename, 'selected.', howToMessage)

    if (code >= STATUS.UPLOADING && code <= STATUS.VALIDATING) {
      message = _getUploadMessage(
        'Upload of',
        filename,
        'is currently in progress.',
        howToMessage
      )
    }

    if (code === STATUS.PARSED_WITH_ERRORS) {
      message = _getUploadMessage(
        'Upload of',
        filename,
        'has formatting errors.',
        howToMessage
      )
    }

    if (code === STATUS.VALIDATED_WITH_ERRORS) {
      message = _getUploadMessage(
        'Upload of',
        filename,
        'is ready for review.',
        howToMessage
      )
    }

    if (code === STATUS.VALIDATED) {
      message = _getUploadMessage(
        'Upload of',
        filename,
        'is ready for submission.',
        howToMessage
      )
    }

    if (code === STATUS.SIGNED) {
      message = _getUploadMessage(
        'Your submission of',
        filename,
        'is complete.',
        howToMessage
      )
    }

    if (errorFile) {
      message = _getUploadMessage(
        '',
        errorFile,
        'cannot be uploaded.',
        howToMessage
      )
    }
  }

  return <button onClick={e => e.preventDefault()}>{message}</button>
}

export default class Upload extends Component {
  constructor(props) {
    super(props)

    // handle the onDrop to set the file and show confirmation modal
    this.onDrop = acceptedFiles => {
      const { handleDrop, code, errorUpload } = this.props
      handleDrop(acceptedFiles, code, errorUpload)
    }
  }

  componentDidMount() {
    if (
      this.props.code >= STATUS.UPLOADING &&
      this.props.code < STATUS.VALIDATED_WITH_ERRORS &&
      this.props.code !== STATUS.PARSED_WITH_ERRORS
    )
      this.props.pollSubmission()
  }

  render() {
    return (
      <section className="UploadForm">
        {/*
          something is wrong with the file
          detected by the front-end
        */}
        {this.props.errors.length > 0 ? (
          <div className="usa-alert usa-alert-error" role="alert">
            <div className="usa-alert-body">
              <ul className="usa-alert-text">
                {this.props.errors.map((error, i) => {
                  return <li key={i}>{error}</li>
                })}
              </ul>
            </div>
          </div>
        ) : null}
        <section className="container-upload">
          <Dropzone
            disablePreview={true}
            onDrop={this.onDrop}
            multiple={false}
            className="dropzone"
            activeClassName="dropzone-active"
          >
            {getDropzoneText(this.props)}
          </Dropzone>
        </section>
        {renderValidationProgress(this.props)}
      </section>
    )
  }
}

Upload.propTypes = {
  // data
  code: PropTypes.number, // submission status
  errorApp: PropTypes.object,
  errorFile: PropTypes.string,
  errors: PropTypes.array,
  errorUpload: PropTypes.object,
  file: PropTypes.object,
  filename: PropTypes.string,
  id: PropTypes.string,
  uploading: PropTypes.bool,
  // dispatch
  handleDrop: PropTypes.func,
  pollSubmission: PropTypes.func
}
