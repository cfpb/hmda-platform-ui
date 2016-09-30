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

const Signature = (props) => {
  const isChecked = props.status.code > 12 ? true : false
  return (
    <div className="Signature">
      <ul className="usa-unstyled-list">
        <li>
          <input id="signature"
            name="signature"
            type="checkbox"
            value="signature"
            onChange={e => props.onSignatureClick(e.target.checked)}
            checked={isChecked} />
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
