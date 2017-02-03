import React, { Component, PropTypes } from 'react'
import ValidationProgress from './ValidationProgress.jsx'

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

  getConfirmation(props) {
    if(props.confirmation) {
      const institutionId = props.base.split('/').slice(1,2)
      return (
        <div className="usa-text-small">
          <p>Are you sure?</p>
          <button className="usa-text-small" onClick={(e)=>{
            e.preventDefault()
            props.toggleConfirm(false)
            props.refileLink(institutionId, props.filingPeriod)
          }}>Yes</button>

          <button className="usa-button usa-button-secondary usa-text-small"
            onClick={(e)=>{
              e.preventDefault()
              props.toggleConfirm(false)
            }}>No</button>
        </div>
      )
    }

    return null
  }

  getRefileLink(props) {
    if(props.code > 7) {
      let message = 'is in progress'
      if(props.code === 11) message = 'has already been submitted'

      return (
        <div className="usa-text-small margin-top-1" style={{textAlign: 'left'}}>
          <p className="margin-bottom-0">The HMDA data for this filing year <strong>{message}</strong>.</p>
          <p className="margin-top-0">Would you like to start the resubmission process?</p>
          <a className="usa-button usa-button-secondary usa-text-small"
            onClick={(e)=>{
              e.preventDefault()
                props.toggleConfirm(true)
            }}>Refile here.</a>
        </div>
      )
    }

    return null
  }

  getValidationProgress(props) {
    if(props.code === 1) return null
    return <ValidationProgress base={props.base} code={props.code} />
  }

  getErrors(errors) {
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
    const isSelectDisabled = this.props.code > 1 ? true : false
    const isUploadDisabled = (this.props.code > 1 || this.props.file === null || this.props.file.name === 'No file chosen' || this.props.errors.length !== 0) ? true : false
    const disabledFileInput = (this.props.code > 1) ? 'usa-button-disabled' : ''
    const disabledFileName = (this.props.code > 1) ? 'input-disabled' : ''
    const inputError = (this.props.errors.length === 0) ? '' : 'input-error'

    return (
      <div>
        <div className="UploadForm">
          {this.getErrors(this.props.errors)}
          <form className="usa-form" encType="multipart/form-data" onSubmit={e => this.props.handleSubmit(e, this.props.file)}>
            <div className={`hmda-file-input usa-button usa-button-gray ${disabledFileInput}`}>
              <label htmlFor="hmdaFile">Select a file</label>
              <input id="hmdaFile" name="hmdaFile" type="file" ref={(input) => {this.fileInput = input}} disabled={isSelectDisabled} onChange={this.props.setFile}></input>
            </div>
            <input className={`${disabledFileName} ${inputError}`} id="hmdaFileName" name="hmdaFileName" type="text" value='No file chosen' ref={(input) => {this.fileName = input}} readOnly disabled></input>
            <input disabled={isUploadDisabled} className="usa-button" id="uploadButton" name="uploadButton" type="submit" value="Upload"></input>
          </form>
          {this.getValidationProgress(this.props)}
        </div>
        {this.getRefileLink(this.props)}
        {this.getConfirmation(this.props)}
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
  errors: PropTypes.array,
  confirmation: PropTypes.bool,
  showConfirm: PropTypes.func
}

Upload.defaultProps = {
  file: {
    name: 'No file chosen'
  },
  errors: []
}

export default Upload
