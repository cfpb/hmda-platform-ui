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
  if(code > 10) return null

  return (
    <div className="usa-alert usa-alert-warning margin-top-0">
      <div className="usa-alert-body">
        <h3 className="usa-alert-heading">IRS report hasn't been verified.</h3>
        <p className="usa-alert-text">You can not sign your submission until the IRS report has been verified.</p>
      </div>
    </div>
  )
}

const Signature = (props) => {
  // if code 11, enable the checkbox
  const isDisabled = props.status.code === 11 ? false : true

  let buttonClass = 'usa-button-disabled'
  // if the checkbox is checked remove disabled from button
  if(props.checked) {
    buttonClass = ''
  }
  // if code is 12 (signed), disable button again
  if(props.status.code === 12) {
    buttonClass = 'usa-button-disabled'
  }
  //let buttonClass = props.checked === true && props.status.code === 12 ? '' : 'usa-button-disabled'

  return (
    <div className="Signature" id="signature">
      <div className="padding-2 bg-color-gray-lightest">
        <h2 className="margin-top-0">Signature</h2>
        <p className="usa-font-lead margin-top-half margin-bottom-0">To complete your submission first check the checkbox to certify accuracy and then click the button to sign.</p>
      </div>

      <div className="border margin-bottom-5 padding-1">
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
            <label htmlFor="signature" className="max-width-100">I am an authorized representative of my institution with knowledge of the data submitted and can certify to the accuracy and completeness of the data submitted.</label>
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
