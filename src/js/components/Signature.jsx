import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const showReceipt = (props) => {
  if(props.status.code !== 12) return null;

  return (
    <div className="usa-alert usa-alert-success margin-top-0">
      <div className="usa-alert-body">
        <h3 className="usa-alert-heading">Submission signed.</h3>
        <p className="usa-alert-text">You have signed your submission on {props.timestamp}. Your receipt # is {props.receipt}.</p>
      </div>
    </div>
  )
}

const showWarning = (props) => {
  if(props.status.code > 10) return null

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
  const isChecked = props.status.code === 12 ? true : false
  const isDisabled = props.status.code > 10 ? false : true

  return (
    <div className="Signature" id="signature">
      <div className="padding-2 bg-color-gray-lightest">
        <h2 className="margin-top-0">Signature</h2>
        <p className="usa-font-lead margin-top-half margin-bottom-0">Here you can sign your submission.</p>
      </div>

      <div className="border margin-bottom-5 padding-1">
        {showWarning(props)}

        <ul className="usa-unstyled-list">
          <li>
            <input id="signature"
              name="signature"
              type="checkbox"
              value="signature"
              onChange={e => props.onSignatureClick(e.target.checked)}
              checked={isChecked}
              disabled={isDisabled} />
            <label htmlFor="signature" className="max-width-100">I am an authorized representative of my institution with knowledge of the data submitted and can certify to the accuracy and completeness of the data submitted.</label>
          </li>
        </ul>
        {showReceipt(props)}
      </div>
    </div>
  )
}

Signature.propTypes = {
  receipt: PropTypes.string,
  timestamp: PropTypes.number,
  status: PropTypes.object,
  onSignatureClick: PropTypes.func.isRequired
}

Signature.defaultProps = {
  status: {
    code: null
  }
}

export default Signature
