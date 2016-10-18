import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const showReceipt = (props) => {
  if(props.status.code < 13) return null;

  return (
    <div>
      <p className="receipt">Receipt #: {props.receipt}</p>
      <p className="timestamp">Timestamp: {props.timestamp}</p>
    </div>
  )
}

const showWarning = (props) => {
  if(props.status.code > 10) return null

  return (
    <div className="usa-alert usa-alert-warning">
      <div className="usa-alert-body">
        <h3 className="usa-alert-heading">You can not sign your submission until the IRS report has been verified.</h3>
      </div>
    </div>
  )
}

const Signature = (props) => {
  const isChecked = props.status.code > 12 ? true : false
  const isDisabled = props.status.code > 11 ? false : true

  return (
    <div className="Signature">
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
          <label htmlFor="signature">I am an authorized representative of my institution with knowledge of the data submitted and can certify to the accuracy and completeness of the data submitted.</label>
        </li>
      </ul>
      {showReceipt(props)}
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
