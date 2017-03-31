import React, { Component, PropTypes } from 'react'

export const renderVerified = (verified) => {
  if(verified) {
    return (
      <div className="usa-alert usa-alert-success">
        <div className="usa-alert-body">
          <p className="usa-alert-text">Macro edits have been verified.</p>
        </div>
      </div>
    )
  }

  return null
}

const MacroVerifier = (props) => {
  const headingClass = props.verified ? 'text-green' : 'text-secondary'

  return (
    <div className="MacroVerifier">
      <h2 className={headingClass}>Verify macro edits</h2>
      <p className="usa-font-lead">In order to continue you must verify all macro edits.</p>
      <ul className="usa-unstyled-list">
        <li>
          <input id="macroVerifier"
            name="macroVerifier"
            type="checkbox"
            checked={props.verified}
            onChange={e => {
              props.onVerify(e.target.checked)
            }}/>
          <label htmlFor="macroVerifier" className="max-width-100">All data are accurate, no corrections required. I have verified the accuracy of all data fields referenced by the macro edits.</label>
        </li>
      </ul>
      {renderVerified(props.verified)}
    </div>
  )
}

MacroVerifier.propTypes = {
  verified: PropTypes.bool.isRequired,
  onVerify: PropTypes.func.isRequired
}

export default MacroVerifier
