import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ValidationProgress from './ValidationProgress.jsx'
import Dropzone from 'react-dropzone'
import Alert from './Alert.jsx'
import * as STATUS from '../constants/statusCodes.js'

export const renderValidationProgress = ({ code, uploading, file, id }) => {
  if (code < STATUS.UPLOADING && !uploading) return null
  return <ValidationProgress file={file} code={code} id={id} />
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
      <p>
        {preText} <strong>{filename}</strong> {postText}
      </p>
      <p className="file-selected">{howToMessage}</p>
    </div>
  )
}

export const getDropzoneText = ({ code, errors, filename }) => {
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

  if (filename) {
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

    if (errors.length > 0) {
      message = _getUploadMessage(
        '',
        filename,
        'can not be uploaded.',
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
      const { code, showConfirmModal, setFile, setNewFile } = this.props

      if (code >= STATUS.UPLOADING) {
        showConfirmModal()
        setNewFile(acceptedFiles)
      } else {
        setFile(acceptedFiles)
      }
    }
  }

  componentDidMount() {
    if (this.props.code >= STATUS.UPLOADING) this.props.pollSubmission()
  }

  render() {
    return (
      <section className="UploadForm">
        <Alert type="warning">
          <p>
            All test data uploaded during the beta period will be removed from
            the system when the filing period opens on January 1st, 2018.
          </p>
        </Alert>
        {renderErrors(this.props.errors)}
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
  setFile: PropTypes.func,
  setNewFile: PropTypes.func,
  showConfirmModal: PropTypes.func,
  pollSubmission: PropTypes.func,
  uploading: PropTypes.bool,
  filename: PropTypes.string,
  file: PropTypes.object,
  code: PropTypes.number,
  errors: PropTypes.array
}
