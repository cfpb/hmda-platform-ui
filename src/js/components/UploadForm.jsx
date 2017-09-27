import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ValidationProgress from './ValidationProgress.jsx'
import Dropzone from 'react-dropzone'
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
    message = (
      <div>
        <p>
          <strong>{filename}</strong> selected.
        </p>
        <p className="file-selected">{howToMessage}</p>
      </div>
    )

    if (code >= STATUS.UPLOADING && code <= STATUS.VALIDATING) {
      message = (
        <div>
          <p>
            Upload of <strong>{filename}</strong> is currently in progress.
          </p>
          <p className="file-selected">{howToMessage}</p>
        </div>
      )
    }

    if (code === STATUS.PARSED_WITH_ERRORS) {
      message = (
        <div>
          <p>
            Upload of <strong>{filename}</strong> has formatting errors.
          </p>
          <p className="file-selected">{howToMessage}</p>
        </div>
      )
    }

    if (code === STATUS.VALIDATED_WITH_ERRORS) {
      message = (
        <div>
          <p>
            Upload of <strong>{filename}</strong> is ready for review.
          </p>
          <p className="file-selected">{howToMessage}</p>
        </div>
      )
    }

    if (code === STATUS.VALIDATED) {
      message = (
        <div>
          <p>
            Upload of <strong>{filename}</strong> is ready for submission.
          </p>
          <p className="file-selected">{howToMessage}</p>
        </div>
      )
    }

    if (code === STATUS.SIGNED) {
      message = (
        <div>
          <p>
            Your submission of <strong>{filename}</strong> is complete.
          </p>
          <p className="file-selected">{howToMessage}</p>
        </div>
      )
    }

    if (errors.length > 0) {
      message = (
        <div>
          <p>
            <strong>{filename}</strong> can not be uploaded.
          </p>
          <p>{howToMessage}</p>
        </div>
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
