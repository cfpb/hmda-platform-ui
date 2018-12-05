import React from 'react'
import PropTypes from 'prop-types'
import ErrorWarning from '../../common/ErrorWarning.jsx'
import { VALIDATED, SIGNED } from '../../constants/statusCodes.js'

import './Signature.css'

const showWarning = props => {
  if (!props.error) return null
  return (
    <ErrorWarning
      error={props.error}
      bodyText="You cannot sign your submission if you have encountered an error in the filing process. Please refresh the page or try again later."
    />
  )
}

const Signature = props => {
  let isDisabled =
    props.status.code >= VALIDATED && props.status.code !== SIGNED
      ? false
      : true

  let buttonClass = 'button-disabled'
  // if the checkbox is checked remove disabled from button
  if (props.checked) {
    buttonClass = ''
  }
  // if signed, disable button again
  if (props.status.code === SIGNED) {
    buttonClass = 'button-disabled'
  }

  // if an error has occurred, disable both checkbox and button
  if (props.error) {
    isDisabled = true
    buttonClass = 'button-disabled'
  }

  return (
    <section className="Signature" id="signature">
      <header>
        <h2>Signature</h2>
        <p className="font-lead">
          To complete your test submission, select the checkbox below. Next,
          select the &quot;Submit HMDA test data&quot; button to practice
          submitting data. When the filing period opens, selecting the checkbox
          will certify the accuracy and completeness of the data submitted.
        </p>
      </header>

      {showWarning(props)}

      <ul className="unstyled-list">
        <li>
          <input
            id="signatureAuth"
            name="signatureAuth"
            type="checkbox"
            value="signature"
            disabled={isDisabled}
            checked={props.checked || props.status.code === SIGNED}
            onChange={e => props.onSignatureCheck(e.target.checked)}
          />
          <label htmlFor="signatureAuth">
            I understand this data being submitted is solely for testing
            purposes and will be removed from the system when the filing period
            begins on January 1st, 2019.
          </label>
        </li>
      </ul>

      <button
        className={buttonClass}
        onClick={e => props.onSignatureClick(props.checked)}
        disabled={isDisabled}
      >
        Submit HMDA test data
      </button>
    </section>
  )
}

Signature.propTypes = {
  status: PropTypes.object,
  checked: PropTypes.bool,
  onSignatureClick: PropTypes.func.isRequired,
  onSignatureCheck: PropTypes.func.isRequired
}

export default Signature
