import React, { Component, PropTypes } from 'react'
import moment from 'moment'

const showReceipt = (code, timestamp, receipt) => {
  if(code !== 12) return null;

  return (
    <div className="usa-alert usa-alert-success margin-top-1">
      <div className="usa-alert-body">
        <h3 className="usa-alert-heading">Submission signed.</h3>
        <p className="usa-alert-text">You have signed your submission on <strong>{moment().calendar(timestamp)}</strong>. Your receipt # is <strong>{receipt}</strong>.</p>
      </div>
    </div>
  )
}

const showWarning = (code) => {
  if(code > 8) return null

  return (
    <div className="usa-alert usa-alert-warning margin-top-0">
      <div className="usa-alert-body">
        <h3 className="usa-alert-heading">Edits still exist.</h3>
        <p className="usa-alert-text">You can not sign your submission until all edits have passed or been verified.</p>
      </div>
    </div>
  )
}

const Signature = (props) => {
  // if code greater than 8 (validated) and not 12 (signed), enable the checkbox
  const isDisabled = (props.status.code > 8 && props.status.code !== 12) ? false : true

  let buttonClass = 'usa-button-disabled'
  // if the checkbox is checked remove disabled from button
  if(props.checked) {
    buttonClass = ''
  }
  // if code is 12 (signed), disable button again
  if(props.status.code === 12) {
    buttonClass = 'usa-button-disabled'
  }

  return (
    <div className="Signature" id="signature">
      <div className="border-bottom margin-bottom-3">
        <h2>Signature</h2>
        <p className="usa-font-lead">To complete your submission first check the checkbox to certify accuracy and then click the button to sign.</p>
      </div>

      <div className="margin-bottom-5">
        {showWarning(props.status.code)}

        <ul className="usa-unstyled-list">
          <li>
            <input id="signature"
              name="signature"
              type="checkbox"
              value="signature"
              disabled={isDisabled}
              checked={props.checked}
              onChange={e => props.onSignatureCheck(e.target.checked)}/>
            <label htmlFor="signature" className="max-width-100">I am an authorized representative of my institution with knowledge of the data submitted and am certifying to the accuracy and completeness of the data submitted.</label>
          </li>
        </ul>

        <button className={buttonClass} onClick={e => props.onSignatureClick(props.checked)}>
          Sign the submission
        </button>
        {showReceipt(props.status.code, props.timestamp, props.receipt)}
      </div>
    </div>
  )
}

Signature.propTypes = {
  receipt: PropTypes.string,
  timestamp: PropTypes.number,
  status: PropTypes.object,
  checked: PropTypes.bool,
  onSignatureClick: PropTypes.func.isRequired,
  onSignatureCheck: PropTypes.func.isRequired
}

Signature.defaultProps = {
  status: {
    code: null
  },
  checked: null
}

export default Signature
