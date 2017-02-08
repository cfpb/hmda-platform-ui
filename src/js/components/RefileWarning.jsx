import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const getText = (props) => {
  let textToRender = null

  if(props.types.hasOwnProperty('syntactical')) {
    if(props.types.syntactical.edits.length !== 0 || props.types.validity.edits.length !== 0) {
      textToRender = <div><span style={{marginRight: '8px'}} className="usa-alert-text"><strong>Syntactical</strong> and <strong>validity</strong> edits require file resubmission.</span></div>
    } else {
      textToRender = <span className="usa-alert-text"><strong>Quality</strong> and <strong>macro</strong> edits must be validated before continuing.</span>
    }
  }

  if(props.submission.status.code === 5) {
    textToRender = <div><span style={{marginRight: '8px'}} className="usa-alert-text"><strong>Parsing</strong> errors require file resubmission.</span></div>
  }

  return (
    <div className="usa-alert-body">
      {textToRender}
    </div>
  )
}


const RefileWarning = (props) => {
  if (props.submission.status.code > 8) return null

  let alertClass = 'usa-alert-error'
  if(props.types.hasOwnProperty('syntactical')) {
    if((props.types.syntactical.edits.length === 0 && props.types.validity.edits.length === 0) && props.submission.status.code !== 5) {
      alertClass = 'usa-alert-warning'
    }
  }

  return (
    <div className={`RefileWarning usa-alert ${alertClass} margin-bottom-2`}>
      <div className="usa-alert-body">
        {getText(props)}
      </div>
    </div>
  )
}

export default RefileWarning
