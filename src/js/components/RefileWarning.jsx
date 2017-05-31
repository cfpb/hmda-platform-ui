import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import RefileButton from '../containers/RefileButton.jsx'
import { PARSED_WITH_ERRORS, VALIDATED_WITH_ERRORS } from '../constants/statusCodes.js'

export const getText = (props) => {
  let textToRender = null

  if(props.syntacticalValidityEditsExist) {
    textToRender = <div className="usa-alert-text"><p>Your file has <strong>syntactical and/or validity edits</strong>.</p><p>Please update your file and select the "Upload a new file" button.</p></div>
  } else if(!props.qualityVerified && props.page === 'quality') {
    textToRender = <div className="usa-alert-text"><p>Your file has <strong>quality edits</strong>.</p><p>You must verify the edits listed below and select the check box to confirm the accuracy of the data. If any of the data need to be corrected, please update your file and <RefileButton isLink={true} isLower={true} />.</p></div>
  } else if(!props.macroVerified && props.page === 'macro') {
    textToRender = <div className="usa-alert-text"><p>Your file has <strong>macro quality edits</strong>.</p><p>You must verify the edits listed below and select the check box to confirm the accuracy of the data. If any of the data need to be corrected, please update your file and <RefileButton isLink={true} isLower={true} />.</p></div>
  }

  if(props.code === PARSED_WITH_ERRORS) {
    textToRender = <div className="usa-alert-text"><p>Your file has <strong>formatting errors</strong>.</p><p>Please update your file and click the "Upload a new file" button.</p></div>
  }

  return textToRender
}

const RefileWarning = (props) => {
  if (props.code > VALIDATED_WITH_ERRORS && props.code < PARSED_WITH_ERRORS) return null
  if (props.page === 'syntacticalvalidity' && !props.syntacticalValidityEditsExist) return null
  if (props.page === 'quality' && props.qualityVerified) return null
  if (props.page === 'macro' && props.macroVerified) return null
  if (props.page === 'upload' && props.code !== PARSED_WITH_ERRORS) return null
  if (props.page === 'confirmation') return null

  let alertClass = 'usa-alert-error'
  if(!props.syntacticalValidityEditsExist && props.code !== PARSED_WITH_ERRORS) {
    alertClass = 'usa-alert-warning'
  }

  const text = getText(props)
  const button = props.code === PARSED_WITH_ERRORS || props.syntacticalValidityEditsExist ? <RefileButton/> : null

  return (
    <div className={`RefileWarning usa-alert ${alertClass}`}>
      <div className="usa-alert-body">
        {text}
        {button}
      </div>
    </div>
  )
}

RefileWarning.propTypes = {
  // from /containers/submissionProgressHOC
  page: PropTypes.string,
  base: PropTypes.string,
  code: PropTypes.number,
  syntacticalValidityEditsExist: PropTypes.bool,
  qualityVerified: PropTypes.bool,
  macroVerified: PropTypes.bool
}

export default RefileWarning
