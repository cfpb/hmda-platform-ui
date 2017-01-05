import React, { Component, PropTypes } from 'react'

const QualityVerifier = (props) => {
  const oneWayVerification = 'Quality edits verified. Incorrect or inaccurate data fields revealed by quality edits will need to be corrected and refiled.'

  return (
    <div className="border margin-bottom-5 padding-1">

      <ul className="usa-unstyled-list">
        <li>
          <input id="qualityVerifier"
            name="qualityVerifier"
            type="checkbox"
            value="qualityVerifier"
            checked={props.checked}
            onChange={e => {
              if (!e.target.checked) return e.preventDefault()
              props.onVerify()
            }}/>
          <label htmlFor="qualityVerifier" className="max-width-100">I have verified the accuracy of all data fields referenced by quality edits.</label>
        </li>
        <li>{props.verified?oneWayVerification:null}</li>
      </ul>
    </div>
  )
}

QualityVerifier.propTypes = {
  quality: PropTypes.object.isRequired,
  onVerify: PropTypes.func.isRequired
}

export default QualityVerifier

