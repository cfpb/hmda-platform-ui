import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import RefileButton from '../containers/RefileButton.jsx'

export const getText = (props) => {
  let textToRender = null

  if(props.syntacticalValidityEditsExist) {
    textToRender = <p className="usa-alert-text">Your file has <strong>syntactical and/or validity edits</strong>. Please update your file and select the "Upload a new file" button.</p>
  } else if(!props.qualityVerified && props.page === 'quality') {
    textToRender = <p className="usa-alert-text">Your file has <strong>quality edits</strong>. You must verify the edits listed below and select the check box to confirm the accuracy of the data. If any of the data need to be corrected, please update your file and select the "Upload a new file" button.</p>
  } else if(!props.macroVerified && props.page === 'macro') {
    textToRender = <p className="usa-alert-text">Your file has <strong>macro quality edits</strong>. You must verify the edits listed below and select the check box to confirm the accuracy of the data. If any of the data need to be corrected, please update your file and select the "Upload a new file" button.</p>
  }

  if(props.code === 5) {
    textToRender = <p className="usa-alert-text">Your file has <strong>formatting errors</strong>. Please update your file and click the "Upload a new file" button.</p>
  }

  return textToRender
}

const RefileWarning = (props) => {
  if (props.code > 8) return null
  if (props.page === 'syntacticalvalidity' && !props.syntacticalValidityEditsExist) return null
  if (props.page === 'quality' && props.qualityVerified) return null
  if (props.page === 'macro' && props.macroVerified) return null

  let alertClass = 'usa-alert-error'
  if(!props.syntacticalValidityEditsExist && props.code !== 5) {
    alertClass = 'usa-alert-warning'
  }

  const text = getText(props)
  const button = text ? <RefileButton/> : null

  return (
    <div className={`RefileWarning usa-alert ${alertClass}`}>
      <div className="usa-alert-body">
        {text}
        {button}
      </div>
    </div>
  )
}

export default RefileWarning
