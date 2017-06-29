import React from 'react'
import PropTypes from 'prop-types'
import * as STATUS from '../constants/statusCodes.js'

export const getFill = props => {
  let fillWidth = 0
  let className = 'progressFill'

  if(props.code === STATUS.PARSED_WITH_ERRORS) className += ' error'

  if(props.code <= STATUS.PARSING) fillWidth = props.percentUploaded/3
  if(props.code >= STATUS.PARSED) fillWidth = 50
  if(props.code === STATUS.PARSED_WITH_ERRORS ||
     props.code > STATUS.VALIDATING) fillWidth = 100

  return <div className={className} style={{width:fillWidth+'%'}}></div>
}

export const getText = props => {
  let text = 'Uploading...'
  if(props.code >= STATUS.PARSING) text = 'Analyzing file format...'
  if(props.code === STATUS.PARSED_WITH_ERRORS) text = 'Invalid file format'
  if(props.code === STATUS.VALIDATING) text = 'Validating edits...'
  if(props.code > STATUS.VALIDATING) text = 'Edit validation complete'

  return (
    <section className="progressText">
      <span>{text}</span>
      {getIndicator(props)}
      {props.code === STATUS.VALIDATED_WITH_ERRORS ?
        <strong>Edits found, review required</strong> :
        null
      }
    </section>
  )
}

export const getIndicator = props => {
  let className = 'progressIndicator'
  if(props.code === STATUS.PARSED_WITH_ERRORS) className += ' error'
  else if(props.code > STATUS.VALIDATING) className += ' complete'
  else className += ' pulsing'
  return <span className={className}></span>
}

const ValidationProgress = props => {
  return (
    <section className="ValidationProgress">
      <div className="progressTotal"></div>
      {getFill(props)}
      {getText(props)}
    </section>
  )
}

ValidationProgress.propTypes = {
  code: PropTypes.number,
  percentUploaded: PropTypes.number
}

export default ValidationProgress
