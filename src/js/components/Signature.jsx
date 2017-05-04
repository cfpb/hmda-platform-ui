import React, { Component, PropTypes } from 'react'
import ErrorWarning from './ErrorWarning.jsx'
import moment from 'moment'

const showReceipt = (code, timestamp, receipt) => {
  if(code !== 10) return null;

  return (
    <div className="usa-alert usa-alert-success">
      <div className="usa-alert-body">
        <h3 className="usa-alert-heading">HMDA data submitted</h3>
        <p className="usa-alert-text">You have submitted your HMDA data on <strong>{moment(timestamp).format('MMMM Do, YYYY, h:mm:ss')}</strong>. Your receipt number is <strong>{receipt}</strong>.</p>
      </div>
    </div>
  )
}

const showWarning = (props) => {
  if(!props.error && props.status.code > 8) return null

  if(props.error) return (
    <ErrorWarning
      error={props.error}
      bodyText="You cannot sign your submission if you have encountered an error in the filing process. Please refresh the page or try again later."
    />
  )

  return (
    <div className="usa-alert usa-alert-warning">
      <div className="usa-alert-body">
        <h3 className="usa-alert-heading">Edits still exist.</h3>
        <p className="usa-alert-text">You can not sign your submission until all edits have passed or been verified.</p>
      </div>
    </div>
  )
}

const Signature = (props) => {
  // if code greater than 8 (validated) and not 10 (signed), enable the checkbox
  let isDisabled = (props.status.code > 8 && props.status.code !== 10) ? false : true

  let buttonClass = 'usa-button-disabled'
  // if the checkbox is checked remove disabled from button
  if(props.checked) {
    buttonClass = ''
  }
  // if code is 10 (signed), disable button again
  if(props.status.code === 10) {
    buttonClass = 'usa-button-disabled'
  }

  // if an error has occurred, disable both checkbox and button
  if(props.error) {
    isDisabled = true
    buttonClass = 'usa-button-disabled'
  }

  return (
    <div className="Signature" id="signature">
      <header>
        <h2>Signature</h2>
        <p className="usa-font-lead">To complete your submission, select the checkbox to certify to the accuracy and completeness of the data submitted. Then, select the "Submit HMDA data" button to submit your data.</p>
      </header>

      {showWarning(props)}

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

      <button
        className={buttonClass}
        onClick={e => props.onSignatureClick(props.checked)}>
        Submit HMDA data
      </button>

      {showReceipt(props.status.code, props.timestamp, props.receipt)}
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
