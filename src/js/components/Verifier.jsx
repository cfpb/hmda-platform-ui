import React, { Component, PropTypes } from 'react'
import { SIGNED } from '../constants/statusCodes.js'

export const renderVerified = (verified, type) => {
  if(verified) {
    return (
      <div className="animated-alert usa-alert usa-alert-success">
        <div className="usa-alert-body">
          <p className="usa-alert-text"><span>{type}</span> edits have been verified.</p>
        </div>
      </div>
    )
  }

  return null
}

const Verifier = (props) => {
  const disabled = props.code === SIGNED || props.noEditsExist ? true : false
  const verifyMessage = 'All data are accurate, no corrections required. I have verified the accuracy of all data fields referenced by the ${props.type} edits.'
  const noEditMessage = 'No ${props.type} edits present. No verification required.'

  return (
    <div className="Verifier">
      <hr />
      <h2>Verify {props.type} edits</h2>
      <p className="usa-font-lead">In order to continue you must verify all {props.type} edits.</p>
      <ul className="usa-unstyled-list">
        <li>
          <input id={`${props.type}Verifier`}
            name={`${props.type}Verifier`}
            type="checkbox"
            checked={props.noEditsExist || props.verified}
            disabled={disabled}
            onChange={e => {
              props.onVerify(e.target.checked)
            }}/>
          <label htmlFor={`${props.type}Verifier`} className="max-width-100">
            {props.noEditsExist ? noEditMessage : verifyMessage}
          </label>
        </li>
      </ul>
      {renderVerified(props.verified, props.type)}
    </div>
  )
}

Verifier.propTypes = {
  type: PropTypes.string.isRequired,
  verified: PropTypes.bool.isRequired,
  onVerify: PropTypes.func.isRequired,
  code: PropTypes.number
}

export default Verifier
