import React, { Component, PropTypes } from 'react'

export const renderVerified = (verified) => {
  if(verified) {
    return (
      <div className="usa-alert usa-alert-success">
        <div className="usa-alert-body">
          <p className="usa-alert-text">Quality edits have been verified.</p>
        </div>
      </div>
    )
  }

  return null
}

const QualityVerifier = (props) => {
  const headingClass = props.verified ? 'text-green' : 'text-secondary'

  return (
    <div className="QualityVerifier">
      <h2 className={headingClass}>Verify quality edits</h2>
      <p className="usa-font-lead">In order to continue you must verify all quality edits.</p>
      <ul className="usa-unstyled-list">
        <li>
          <input id="qualityVerifier"
            name="qualityVerifier"
            type="checkbox"
            checked={props.verified}
            onChange={e => {
              props.onVerify(e.target.checked)
            }}/>
          <label htmlFor="qualityVerifier" className="max-width-100">All data are accurate, no corrections required. I have verified the accuracy of all data fields referenced by the quality edits.</label>
        </li>
      </ul>
      {renderVerified(props.verified)}
    </div>
  )
}

QualityVerifier.propTypes = {
  verified: PropTypes.bool.isRequired,
  onVerify: PropTypes.func.isRequired
}

export default QualityVerifier
