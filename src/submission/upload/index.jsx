import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from '../../common/Alert.jsx'
import ValidationProgress from './ValidationProgress.jsx'
import Dropzone from 'react-dropzone'
import DropzoneContent from './DropzoneContent.jsx'
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
          <Alert heading="Sorry, your file has errors." type="error">
            <ul>
              {this.props.errors.map((error, i) => {
                return <li key={i}>{error}</li>
              })}
            </ul>
          </Alert>
        ) : null}
        <Dropzone
          disablePreview={true}
          onDrop={this.onDrop}
          multiple={false}
          className="dropzone"
          activeClassName="dropzone-active"
        >
          <DropzoneContent
            code={this.props.code}
            errorFile={this.props.errorFile}
            errors={this.props.errors}
            filename={this.props.filename}
          />
        </Dropzone>
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
  uploading: PropTypes.bool,
  // dispatch
  handleDrop: PropTypes.func,
  pollSubmission: PropTypes.func
}
