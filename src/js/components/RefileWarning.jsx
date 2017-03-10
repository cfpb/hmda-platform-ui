import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import RefileButton from '../containers/RefileButton.jsx'

export const getText = (props) => {
  let textToRender = null

  if(props.syntacticalValidityEditsExist) {
    textToRender = <p className="usa-alert-text"><strong>Syntactical</strong> and <strong>validity</strong> edits require file resubmission.</p>
  } else {
    textToRender = <p className="usa-alert-text"><strong>Quality</strong> and <strong>macro</strong> edits must be validated before continuing.</p>
  }

  if(props.code === 5) {
    textToRender = <p className="usa-alert-text"><strong>Your file has formatting errors.</strong> Update your file and click the refile button or return to the <Link to="/institutions">Institutions</Link> page.</p>
  }

  return textToRender
}

export const getButton = (props) => {
  let button = null

  if(props.syntacticalValidityEditsExist) {
    button = <RefileButton />
  }

  if(props.code === 5) {
    button = <RefileButton />
  }

  return button
}


const RefileWarning = (props) => {
  if (props.code > 8) return null

  let alertClass = 'usa-alert-error'
  if(!props.syntacticalValidityEditsExist && props.code !== 5) {
    alertClass = 'usa-alert-warning'
  }

  return (
    <div className={`RefileWarning usa-alert ${alertClass}`}>
      {getButton(props)}
      <div className="usa-alert-body">
        {getText(props)}
      </div>
    </div>
  )
}

export default RefileWarning
