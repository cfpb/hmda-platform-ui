import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'
import { SIGNED } from '../constants/statusCodes.js'

export const renderVerified = (verified, type) => {
  if (verified) {
    return (
      <Alert type="success">
        <p><span>{type}</span> edits have been verified.</p>
      </Alert>
    )
  }

  return null
}

const Verifier = props => {
  const disabled = props.code === SIGNED ? true : false

  return props.noEditsExist
    ? null
    : <section className="Verifier">
        <hr />
        <h2>Verify {props.type} edits</h2>
        <p className="usa-font-lead">
          In order to continue you must verify all {props.type} edits.
        </p>
        <ul className="usa-unstyled-list">
          <li>
            <input
              id={`${props.type}Verifier`}
              name={`${props.type}Verifier`}
              type="checkbox"
              checked={props.noEditsExist || props.verified}
              disabled={disabled}
              onChange={e => {
                props.onVerify(e.target.checked)
              }}
            />
            <label htmlFor={`${props.type}Verifier`} className="max-width-100">
              All data are accurate, no corrections required. I have verified
              the accuracy of all data fields referenced by the {props.type}{' '}
              edits.
            </label>
          </li>
        </ul>
        {renderVerified(props.verified, props.type)}
      </section>
}

Verifier.propTypes = {
  type: PropTypes.string.isRequired,
  verified: PropTypes.bool.isRequired,
  onVerify: PropTypes.func.isRequired,
  code: PropTypes.number
}

export default Verifier
