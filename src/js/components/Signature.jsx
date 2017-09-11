import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ErrorWarning from './ErrorWarning.jsx'
import { ordinalHour } from '../utils/date.js'
import Alert from './Alert.jsx'
import { VALIDATED_WITH_ERRORS, SIGNED } from '../constants/statusCodes.js'

const showReceipt = ({status, timestamp, receipt, filingPeriod, email}) => {
  const code = status.code
  if (code !== SIGNED) return null

  return (
    <Alert type="success" heading="HMDA filing completed">
      <div>
        <hr/>
        <p>Congratulations, you have successfully completed your HMDA filing for {filingPeriod}!</p>
        <p>Your data and signature have been received and recorded.</p>
        <p className="usa-text-small">Your submission was received on <strong>{ordinalHour(new Date(timestamp))}</strong>.</p>
        <p className="usa-text-small">Your receipt number is <strong>{receipt}</strong>.</p>
        <hr/>
        <p>You will receive a confirmation email with this information shortly at <strong>{email}</strong>.</p>
      </div>
    </Alert>
  )
}

const showWarning = props => {
  if (!props.error && props.status.code > VALIDATED_WITH_ERRORS) return null

  if (props.error)
    return (
      <ErrorWarning
        error={props.error}
        bodyText="You cannot sign your submission if you have encountered an error in the filing process. Please refresh the page or try again later."
      />
    )

  return (
    <Alert type="warning" heading="Edits still exist.">
      <p>You can not sign your submission until all edits have passed or been verified.</p>
    </Alert>
  )
}

const Signature = props => {
  let isDisabled = props.status.code > VALIDATED_WITH_ERRORS &&
    props.status.code !== SIGNED
    ? false
    : true

  let buttonClass = 'usa-button-disabled'
  // if the checkbox is checked remove disabled from button
  if (props.checked) {
    buttonClass = ''
  }
  // if signed, disable button again
  if (props.status.code === SIGNED) {
    buttonClass = 'usa-button-disabled'
  }

  // if an error has occurred, disable both checkbox and button
  if (props.error) {
    isDisabled = true
    buttonClass = 'usa-button-disabled'
  }

  return (
    <section className="Signature" id="signature">
      <header>
        <h2>Signature</h2>
        <p className="usa-font-lead">
          To complete your submission, select the checkbox to certify to the
          accuracy and completeness of the data submitted. Then, select the
          &quot;Submit HMDA data&quot; button to submit your data.
        </p>
      </header>

      {showWarning(props)}

      <ul className="usa-unstyled-list">
        <li>
          <input
            id="signature"
            name="signature"
            type="checkbox"
            value="signature"
            disabled={isDisabled}
            checked={props.checked}
            onChange={e => props.onSignatureCheck(e.target.checked)}
          />
          <label htmlFor="signature" className="max-width-100">
            I am an authorized representative of my institution with knowledge
            of the data submitted and am certifying to the accuracy and
            completeness of the data submitted.
          </label>
        </li>
      </ul>

      <button
        className={buttonClass}
        onClick={e => props.onSignatureClick(props.checked)}
      >
        Submit HMDA data
      </button>

      {showReceipt(props)}
    </section>
  )
}

Signature.propTypes = {
  email: PropTypes.string,
  filingPeriod: PropTypes.string,
  receipt: PropTypes.string,
  timestamp: PropTypes.number,
  status: PropTypes.object,
  checked: PropTypes.bool,
  onSignatureClick: PropTypes.func.isRequired,
  onSignatureCheck: PropTypes.func.isRequired
}

export default Signature
