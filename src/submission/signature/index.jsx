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
          To complete your submission, select the checkbox to certify the
          accuracy and completeness of the data submitted. Next, select the
          &ldquo;Submit HMDA data&rdquo; button to submit your data.
        </p>
      </header>

      {showWarning(props)}

      <div class="grid">
        <input
          id="signatureAuth"
          name="signatureAuth"
          type="checkbox"
          value="signature"
          disabled={isDisabled}
          checked={props.checked}
          onChange={e => props.onSignatureCheck(e.target.checked)}
        />
        <label htmlFor="signatureAuth">
          I am an authorized representative of my institution with knowledge of
          the data submitted and am certifying to the accuracy and completeness
          of the data submitted.
        </label>
      </div>

      <button
        className={buttonClass}
        onClick={e => props.onSignatureClick(props.checked)}
      >
        Submit HMDA data
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
