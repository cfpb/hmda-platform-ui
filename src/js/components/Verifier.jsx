import React, { Component, PropTypes } from 'react'

export const renderVerified = (verified, type) => {
  if(verified) {
    return (
      <div className="usa-alert usa-alert-success">
        <div className="usa-alert-body">
          <p className="usa-alert-text"><span>{type}</span> edits have been verified.</p>
        </div>
      </div>
    )
  }

  return null
}

const Verifier = (props) => {
  const headingClass = props.verified ? 'text-green' : 'text-secondary'

  return (
    <div className="Verifier">
      <h2 className={headingClass}>Verify {props.type} edits</h2>
      <p className="usa-font-lead">In order to continue you must verify all {props.type} edits.</p>
      <ul className="usa-unstyled-list">
        <li>
          <input id={`${props.type}Verifier`}
            name={`${props.type}Verifier`}
            type="checkbox"
            checked={props.verified}
            onChange={e => {
              props.onVerify(e.target.checked)
            }}/>
          <label htmlFor={`${props.type}Verifier`} className="max-width-100">All data are accurate, no corrections required. I have verified the accuracy of all data fields referenced by the {props.type} edits.</label>
        </li>
      </ul>
      {renderVerified(props.verified, props.type)}
    </div>
  )
}

Verifier.propTypes = {
  type: PropTypes.string.isRequired,
  verified: PropTypes.bool.isRequired,
  onVerify: PropTypes.func.isRequired
}

export default Verifier
