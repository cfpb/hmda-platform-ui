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

  getRefileLink(props) {
    if(props.code > 7) {
      let message = 'is in progress'
      if(props.code === 11) message = 'has already been submitted'
      const institutionId = props.base.split('/').slice(1,2)

      return (
        <div className="usa-text-small margin-top-1" style={{textAlign: 'left'}}>
          <p className="margin-bottom-0">The HMDA data for this filing year <strong>{message}</strong>.</p>
          <p className="margin-top-0">Would you like to start the resubmission process?</p>
          <a className="usa-button usa-button-secondary usa-text-small"
            onClick={(e)=>{
              e.preventDefault()
              props.refileLink(institutionId, props.filingPeriod)
            }}>Refile here.</a>
        </div>
      )
    }

    return null
  }

  getValidation(props) {
    if(props.code === 1) return null
    return <ValidationProgress base={props.base} code={props.code} />
  }

  render() {
    const isDisabled = (this.props.code > 1) ? true : false
    const disabledFileInput = (this.props.code > 1) ? 'usa-button-disabled' : ''
    const disabledFileName = (this.props.code > 1) ? 'input-disabled' : ''

    return (
      <div>
        <div className="UploadForm">
          <form className="usa-form" encType="multipart/form-data" onSubmit={e => this.props.handleSubmit(e, this.props.file)}>
            <div className={`hmda-file-input usa-button usa-button-gray ${disabledFileInput}`}>
              <label htmlFor="hmdaFile">Select a file</label>
              <input id="hmdaFile" name="hmdaFile" type="file" ref={(input) => {this.fileInput = input}} disabled={isDisabled} onChange={this.props.setFile}></input>
            </div>
            <input className={disabledFileName} id="hmdaFileName" name="hmdaFileName" type="text" value='No file chosen' ref={(input) => {this.fileName = input}} readOnly disabled></input>
            <input disabled={isDisabled} className="usa-button" id="uploadButton" name="uploadButton" type="submit" value="Upload"></input>
          </form>
          {this.getValidation(this.props)}
        </div>
        {this.getRefileLink(this.props)}
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
