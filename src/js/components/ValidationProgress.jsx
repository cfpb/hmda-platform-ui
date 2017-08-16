import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as STATUS from '../constants/statusCodes.js'

let SCALING_FACTOR = 1
export default class ValidationProgress extends Component {
  constructor(props) {
    super(props)
    this.state = {fillWidth: 0}
    if(props.file){
      SCALING_FACTOR = props.file.size/1e6
      if(SCALING_FACTOR < 1) SCALING_FACTOR = 1
      if(SCALING_FACTOR > 5) SCALING_FACTOR = 5
    }
  }

  componentWillReceiveProps(props){
    if(props.file){
      SCALING_FACTOR = props.file.size/1e6
      if(SCALING_FACTOR < 1) SCALING_FACTOR = 1
      if(SCALING_FACTOR > 5) SCALING_FACTOR = 5
    }
  }

  getText() {
    let text = 'Uploading...'
    const code = this.props.code
    const largeFile = this.props.file && this.props.file.size > 1e5
    if(code >= STATUS.PARSING) text = 'Analyzing file format...'
    if(code === STATUS.PARSED_WITH_ERRORS) text = 'Invalid file format'
    if(code === STATUS.VALIDATING) text = 'Validating edits...'
    if(code > STATUS.VALIDATING) text = 'Edit validation complete'

    return (
      <section className="progressText">
        <span>{text}</span>
        {this.getIndicator()}
        {code === STATUS.VALIDATED_WITH_ERRORS ?
          <strong>Edits found, review required</strong> :
          largeFile && code !== STATUS.PARSED_WITH_ERRORS ?
            <strong>This may take several minutes</strong> :
            null
        }
      </section>
    )
  }

  getIndicator() {
    let className = 'progressIndicator'
    if(this.props.code === STATUS.PARSED_WITH_ERRORS) className += ' error'
    else if(this.props.code > STATUS.VALIDATING) className += ' complete'
    else className += ' pulsing'
    return <span className={className}></span>
  }

  getFill() {
    let className = 'progressFill'
    let currWidth = this.state.fillWidth
    const code = this.props.code

    if(code === STATUS.PARSED_WITH_ERRORS) className += ' error'

    if(code === STATUS.PARSED_WITH_ERRORS ||
       code > STATUS.VALIDATING) currWidth = 100
    else this.getNextWidth()

    return <div className={className} style={{width: currWidth+'%'}}></div>
  }

  setNextWidth(currWidth) {
    return () => {
      let nextWidth = currWidth + 1
      if(nextWidth > 100) nextWidth = 100
      this.setState({fillWidth: nextWidth})
    }
  }

  getNextWidth() {
    const currWidth = this.state.fillWidth
    this.timeout = setTimeout(
      this.setNextWidth(currWidth),
      SCALING_FACTOR*200 * Math.pow(2, 50/(100 - currWidth))
    )
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    return (
      <section className="ValidationProgress">
        <div className="progressTotal"></div>
        {this.getFill()}
        {this.getText()}
      </section>
    )
  }
}

ValidationProgress.propTypes = {
  code: PropTypes.number,
  percentUploaded: PropTypes.number,
  file: PropTypes.object
}
