import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import RefileButton from '../containers/RefileButton.jsx'

export const getText = (props) => {
  let textToRender = null

  if(props.syntacticalValidityEditsExist) {
    textToRender = <div><p className="usa-alert-text">Your file has <strong>syntactical and/or validity edits</strong>.</p><p className="usa-alert-text">Update your file and select the "Upload a new file" button, or return to the "Institutions" page.</p></div>
  } else if(!props.qualityVerified && props.page === 'quality') {
    textToRender = <div><p className="usa-alert-text">You must verify the quality edits listed below and select the check box to confirm the accuracy of the data.</p><p className="usa-alert-text">If any of the data need to be corrected, please update your file and select the "Upload a new file" button. You will need to begin the filing process again.</p></div>
  } else if(!props.macroVerified && props.page === 'macro') {
    textToRender = <div><p className="usa-alert-text">You must verify the macro quality edits listed below and select the check box to confirm the accuracy of the data.</p><p className="usa-alert-text">If any of the data need to be corrected, please update your file and select the "Upload a new file" button. You will need to begin the filing process again.</p></div>
  }

  if(props.code === 5) {
    textToRender = <p className="usa-alert-text"><strong>Your file has formatting errors.</strong> Update your file and click the refile button or return to the <Link to="/institutions">Institutions</Link> page.</p>
  }

  return textToRender
}

const RefileWarning = (props) => {
  if (props.code > 8) return null
  if (props.page === 'syntacticalvalidity' && !props.syntacticalValidityEditsExist) return null

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
