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
    if (this.props.uploadError || this.props.appError) width = 0
    localStorage.setItem(`HMDA_FILE_PROGRESS/${id}`, width)
  }

  getText() {
    let text = 'Uploading...'
    const code = this.props.code

    if (code >= STATUS.PARSING) text = 'Analyzing file format...'
    if (code === STATUS.PARSED_WITH_ERRORS)
      text = 'File contains formatting errors.'
    if (code === STATUS.VALIDATING) text = 'Validating edits...'
    if (code > STATUS.VALIDATING) text = 'Edit validation complete.'

    if (this.props.uploadError)
      text = 'There was an error uploading your file. Please try again.'
    else if (this.props.appError)
      text =
        'There was an error checking your validation progress. Please refresh the page.'

    const largeFile = this.props.file && this.props.file.size > 1e5

    return (
      <section className="progressText">
        <span>{text}</span>
        {this.getIndicator()}
        {code === STATUS.VALIDATED_WITH_ERRORS ? (
          <strong>Edits found, review required.</strong>
        ) : largeFile &&
        (code > STATUS.UPLOADED && code < STATUS.VALIDATED_WITH_ERRORS) &&
        code !== STATUS.PARSED_WITH_ERRORS &&
        !this.props.uploadError &&
        !this.props.appError ? (
          <strong>
            This process may take a little while. Your upload will complete
            automatically, so you may leave the platform and log back in later.
          </strong>
        ) : null}
      </section>
    )
  }

  getIndicator() {
    let className = 'progressIndicator'
    if (
      this.props.code === STATUS.PARSED_WITH_ERRORS ||
      this.props.uploadError ||
      this.props.appError
    )
      className += ' error'
    else if (this.props.code > STATUS.VALIDATING) className += ' complete'
    else className += ' pulsing'
    return <span className={className} />
  }

  getFill() {
    let className = 'progressFill'
    let currWidth = this.state.fillWidth
    const code = this.props.code
    const errored =
      code === STATUS.PARSED_WITH_ERRORS ||
      this.props.uploadError ||
      this.props.appError

    if (errored) className += ' error'

    if (errored || code > STATUS.VALIDATING) {
      currWidth = 100
      this.saveWidth(this.props.id, 100)
    } else if (!this.timeout) this.getNextWidth()

    return <div className={className} style={{ width: currWidth + '%' }} />
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
    if (!this.props.id) return null
    return (
      <section className="ValidationProgress">
        <div className="progressTotal" />
        {this.getFill()}
        {this.getText()}
      </section>
    )
  }
}

ValidationProgress.propTypes = {
  code: PropTypes.number,
  id: PropTypes.string,
  file: PropTypes.object,
  uploadError: PropTypes.object,
  appError: PropTypes.object
}
