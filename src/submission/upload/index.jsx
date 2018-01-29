import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shouldComponentUpdate from '../../utils/shouldComponentUpdate.js'
import ValidationProgress from './ValidationProgress.jsx'
import Dropzone from 'react-dropzone'
import * as STATUS from '../../constants/statusCodes.js'

export const renderValidationProgress = ({
  code,
  uploading,
  file,
  id,
  uploadError,
  appError
}) => {
  if (code < STATUS.UPLOADING && !uploading) return null
  return (
    <ValidationProgress
      uploadError={uploadError}
      appError={appError}
      file={file}
      code={code}
      id={id}
    />
  )
}

export const renderErrors = errors => {
  if (errors.length === 0) return null

  return (
    <div className="usa-alert usa-alert-error" role="alert">
      <div className="usa-alert-body">
        <ul className="usa-alert-text">
          {errors.map((error, i) => {
            return <li key={i}>{error}</li>
          })}
        </ul>
      </div>
    </div>
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
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this)

    // handle the onDrop to set the file and show confirmation modal
    this.onDrop = acceptedFiles => {
      const { handleDrop, code, uploadError } = this.props
      handleDrop(acceptedFiles, code, uploadError)
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
        {renderErrors(this.props.errors, this.props.uploadError)}
        <section className="container-upload">
          <Dropzone
            disablePreview={true}
            onDrop={this.onDrop}
            multiple={false}
            className="dropzone"
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
  handleDrop: PropTypes.func,
  pollSubmission: PropTypes.func,
  uploading: PropTypes.bool,
  filename: PropTypes.string,
  file: PropTypes.object,
  code: PropTypes.number,
  errors: PropTypes.array,
  uploadError: PropTypes.object,
  appError: PropTypes.object,
  errorFile: PropTypes.string
}
