import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ProgressText from './ProgressText.jsx'
import * as STATUS from '../../constants/statusCodes.js'

import './ValidationProgress.css'

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

  isErrored() {
    return (
      this.props.code === STATUS.PARSED_WITH_ERRORS ||
      this.props.errorUpload ||
      this.props.errorApp
    )
  }

  getFillError() {
    if (this.isErrored()) return 'error'
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
    const { code, errorApp, errorUpload, file, uploading } = this.props

    if (code < STATUS.UPLOADING && !uploading) return null
    return (
      <section className="ValidationProgress">
        {/* the background bar */}
        <div className="progressTotal" />
        {/* the progress bar */}
        <div
          className={`progressFill ${this.getFillError()}`}
          style={{ width: this.getFillWidth() + '%' }}
        />
        <ProgressText
          code={code}
          errorApp={errorApp}
          errorUpload={errorUpload}
          file={file}
        />
      </section>
    )
  }
}

ValidationProgress.propTypes = {
  code: PropTypes.number,
  errorApp: PropTypes.object,
  errorUpload: PropTypes.object,
  file: PropTypes.object,
  id: PropTypes.string,
  uploading: PropTypes.bool
}
