import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as STATUS from '../../constants/statusCodes.js'

export default class ValidationProgress extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { fillWidth: this.getSavedWidth(props.id) }
    this.SCALING_FACTOR = 1
    if (props.file) {
      this.SCALING_FACTOR = props.file.size / 1e6
      if (this.SCALING_FACTOR < 1) this.SCALING_FACTOR = 1
      if (this.SCALING_FACTOR > 5) this.SCALING_FACTOR = 5
    }
  }

  componentWillReceiveProps(props) {
    if (props.file) {
      this.SCALING_FACTOR = props.file.size / 1e6
      if (this.SCALING_FACTOR < 1) this.SCALING_FACTOR = 1
      if (this.SCALING_FACTOR > 5) this.SCALING_FACTOR = 5
    }
    if (props.id !== this.props.id) {
      this.setState({ fillWidth: this.getSavedWidth(props.id) })
    }
  }

  getSavedWidth(id) {
    return id ? +localStorage.getItem(`HMDA_FILE_PROGRESS/${id}`) : 0
  }

  saveWidth(id, width) {
    if (this.props.errorUpload || this.props.errorApp) width = 0
    localStorage.setItem(`HMDA_FILE_PROGRESS/${id}`, width)
  }

  getProgressText() {
    let progressText = 'Uploading...'
    const code = this.props.code

    if (code >= STATUS.PARSING) progressText = 'Analyzing file format...'
    if (code === STATUS.PARSED_WITH_ERRORS)
      progressText = 'File contains formatting errors.'
    if (code === STATUS.VALIDATING) progressText = 'Validating edits...'
    if (code > STATUS.VALIDATING) progressText = 'Edit validation complete.'

    if (this.props.errorUpload)
      progressText = 'There was an error uploading your file. Please try again.'
    else if (this.props.errorApp)
      progressText =
        'There was an error checking your validation progress. Please refresh the page.'

    return progressText
  }

  getEditsFoundMessage() {
    if (this.props.code === STATUS.VALIDATED_WITH_ERRORS) {
      return 'Edits found, review required.'
    }
    return null
  }

  getLargeFileMessage() {
    const largeFile = this.props.file && this.props.file.size > 1e5
    if (
      // large file and the process is still running
      // and there are no errors
      largeFile &&
      (this.props.code > STATUS.UPLOADED &&
        this.props.code < STATUS.VALIDATED_WITH_ERRORS) &&
      this.props.code !== STATUS.PARSED_WITH_ERRORS &&
      !this.props.errorUpload &&
      !this.props.errorApp
    ) {
      return 'This process may take a little while. Your upload will complete automatically, so you may leave the platform and log back in later.'
    }
    return null
  }

  getIndicatorClass() {
    if (
      this.props.code === STATUS.PARSED_WITH_ERRORS ||
      this.props.errorUpload ||
      this.props.errorApp
    ) {
      return ' error'
    }
    if (this.props.code > STATUS.VALIDATING) {
      return ' complete'
    }
    return ' pulsing'
  }

  isErrored() {
    return (
      this.props.code === STATUS.PARSED_WITH_ERRORS ||
      this.props.errorUpload ||
      this.props.errorApp
    )
  }

  getFillError() {
    if (this.isErrored()) return ' error'
    return ''
  }

  getFillWidth() {
    let currWidth = this.state.fillWidth
    if (this.isErrored() || this.props.code > STATUS.VALIDATING) {
      currWidth = 100
      this.saveWidth(this.props.id, 100)
    } else if (!this.timeout) this.getNextWidth()

    return currWidth
  }

  setNextWidth(currWidth) {
    return () => {
      this.timeout = null
      let nextWidth = currWidth + 1
      if (nextWidth > 100) nextWidth = 100
      this.saveWidth(this.props.id, nextWidth)
      this.setState({ fillWidth: nextWidth })
    }
  }

  getNextWidth() {
    const currWidth = this.state.fillWidth
    this.timeout = setTimeout(
      this.setNextWidth(currWidth),
      this.SCALING_FACTOR * 200 * Math.pow(2, 50 / (100 - currWidth))
    )
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
    this.timeout = null
  }

  render() {
    return (
      <section className="ValidationProgress">
        <div className="progressTotal" />
        <div
          className={`progressFill${this.getFillError()}`}
          style={{ width: this.getFillWidth() + '%' }}
        />
        <section className="progressText">
          <span>{this.getProgressText()}</span>
          <span className={`progressIndicator${this.getIndicatorClass()}`} />
          <strong>
            {/*
              these messages will not render at the same time
              but, both are within a <strong>
            */}
            {this.getEditsFoundMessage()}
            {this.getLargeFileMessage()}
          </strong>
        </section>
      </section>
    )
  }
}

ValidationProgress.propTypes = {
  code: PropTypes.number,
  errorApp: PropTypes.object,
  errorUpload: PropTypes.object,
  file: PropTypes.object
}
