import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from '../../common/Alert.jsx'
import ValidationProgress from './ValidationProgress.jsx'
import Dropzone from 'react-dropzone'
import DropzoneContent from './DropzoneContent.jsx'
import * as STATUS from '../../constants/statusCodes.js'

import './UploadForm.css'

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
    const { code, pollSubmission } = this.props
    if (
      code >= STATUS.UPLOADING &&
      code < STATUS.VALIDATED_WITH_ERRORS &&
      code !== STATUS.PARSED_WITH_ERRORS
    )
      pollSubmission()
  }

  render() {
    const {
      code,
      errorApp,
      errorFile,
      errors,
      errorUpload,
      file,
      filename,
      id,
      uploading
    } = this.props

    return (
      <section className="UploadForm">
        <div className="data-warning text-small">
          Institutions are strongly encouraged not to use the applicant’s or
          borrower’s name or Social Security number in the Loan/Application
          Number field, for privacy reasons.
        </div>
        {/*
          something is wrong with the file
          detected by the front-end
        */}
        {errors.length > 0 ? (
          <Alert heading="Sorry, your file has errors." type="error">
            <ul>
              {errors.map((error, i) => {
                return <li key={i}>{error}</li>
              })}
            </ul>
          </Alert>
        ) : null}
        <Alert type="warning">
          <p>
            All test data uploaded during the beta period will be removed from the system
            when the filing period opens on January 1st, 2019.
          </p>
        </Alert>
        <Dropzone
          disablePreview={true}
          onDrop={this.onDrop}
          multiple={false}
          className="dropzone"
          activeClassName="dropzone-active"
        >
          <DropzoneContent
            code={code}
            errorFile={errorFile}
            errors={errors}
            filename={filename}
          />
        </Dropzone>
        <ValidationProgress
          code={code}
          errorApp={errorApp}
          errorUpload={errorUpload}
          file={file}
          id={id}
          uploading={uploading}
        />
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
