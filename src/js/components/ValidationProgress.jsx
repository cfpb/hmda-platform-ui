import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as STATUS from '../constants/statusCodes.js'

let SCALING_FACTOR = 1
export default class ValidationProgress extends Component {
  constructor(props) {
    super(props)
    this.state = { fillWidth: this.getSavedWidth(props.id) }
    if (props.file) {
      SCALING_FACTOR = props.file.size / 1e6
      if (SCALING_FACTOR < 1) SCALING_FACTOR = 1
      if (SCALING_FACTOR > 5) SCALING_FACTOR = 5
    }
  }

  componentWillReceiveProps(props) {
    if (props.file) {
      SCALING_FACTOR = props.file.size / 1e6
      if (SCALING_FACTOR < 1) SCALING_FACTOR = 1
      if (SCALING_FACTOR > 5) SCALING_FACTOR = 5
    }
    if (props.id !== this.props.id) {
      this.setState({ fillWidth: this.getSavedWidth(props.id) })
    }
  }

  getSavedWidth(id) {
    return id ? +localStorage.getItem(`HMDA_FILE_PROGRESS/${id}`) : 0
  }

  saveWidth(id, width) {
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

    const largeFile = this.props.file && this.props.file.size > 1e5

    return (
      <section className="progressText">
        <span>{text}</span>
        {this.getIndicator()}
        {code === STATUS.VALIDATED_WITH_ERRORS ? (
          <strong>Edits found, review required.</strong>
        ) : largeFile &&
        (code > STATUS.UPLOADED && code < STATUS.VALIDATED_WITH_ERRORS) &&
        code !== STATUS.PARSED_WITH_ERRORS ? (
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
    if (this.props.code === STATUS.PARSED_WITH_ERRORS) className += ' error'
    else if (this.props.code > STATUS.VALIDATING) className += ' complete'
    else className += ' pulsing'
    return <span className={className} />
  }

  getFill() {
    let className = 'progressFill'
    let currWidth = this.state.fillWidth
    const code = this.props.code

    if (code === STATUS.PARSED_WITH_ERRORS) className += ' error'

    console.log('initial getfill', code, currWidth)

    if (code === STATUS.PARSED_WITH_ERRORS || code > STATUS.VALIDATING) {
      currWidth = 100
      console.log('reassigning', currWidth)
      this.saveWidth(this.props.id, 100)
    } else if (!this.timeout) this.getNextWidth()

    return <div className={className} style={{ width: currWidth + '%' }} />
  }

  setNextWidth(currWidth) {
    return () => {
      console.log('setNextWidth timeout', currWidth)
      this.timeout = null
      let nextWidth = currWidth + 1
      if (nextWidth > 100) nextWidth = 100
      console.log('next', nextWidth)
      this.saveWidth(this.props.id, nextWidth)
      this.setState({ fillWidth: nextWidth })
    }
  }

  getNextWidth() {
    const currWidth = this.state.fillWidth
    console.log('from getNextWidth', currWidth)
    this.timeout = setTimeout(
      this.setNextWidth(currWidth),
      SCALING_FACTOR * 200 * Math.pow(2, 50 / (100 - currWidth))
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
  file: PropTypes.object
}
