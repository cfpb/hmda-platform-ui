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
  console.log('Signature component')
  console.log(props)
  console.log(props.status.code)
  const isChecked = props.status.code === 13 ? true : false
  return (
    <div className="Signature">
      <p>
        <input type="checkbox" value="Signature"
          onChange={e => props.updateSignature({ signed: e.target.checked })}
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
  status: React.PropTypes.object,
  updateSignature: PropTypes.func.isRequired
}

export default connect()(Signature)
