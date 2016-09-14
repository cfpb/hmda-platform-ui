import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const showReceipt = (props) => {
  if(!props.receipt) return null;

  return (
    <div>
      <p className="receipt">Receipt #: {props.receipt}</p>
      <p className="timestamp">Timestamp: {props.timestamp}</p>
    </div>
  )
}

const Signature = (props) => {
  const isChecked = props.receipt ? true : false
  return (
    <div className="Signature">
      <p>
        <input type="checkbox" value="Signature"
          onChange={e => props.onSignatureClick(e)}
          checked={isChecked} />
        I am an authorized representative of my institution with knowledge of the data submitted and can certify to the accuracy and completeness of the data submitted.
      </p>
      {showReceipt(props)}
    </div>
  )
}

Signature.propTypes = {
  receipt: React.PropTypes.string,
  timestamp: React.PropTypes.number,
  onSignatureClick: PropTypes.func.isRequired
}

export default Signature
