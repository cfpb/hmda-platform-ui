import React from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'
import { ordinalHour } from '../utils/date.js'
import { SIGNED } from '../constants/statusCodes.js'

const SubmissionReceipt = ({status, timestamp, receipt, filingPeriod, email}) => {
  const code = status.code
  if (code !== SIGNED) return null

  return (
    <Alert type="success" heading="HMDA filing completed">
      <div>
        <p>Congratulations, you have successfully completed your HMDA filing for {filingPeriod}!</p>
        <p>Your data and signature were received and recorded on <strong>{ordinalHour(new Date(timestamp))}</strong>.</p>
        <p>Your receipt number for this submission is <strong>{receipt}</strong>.</p>
        <p>You will receive a confirmation email shortly at <strong>{email}.</strong></p>
      </div>
    </Alert>
  )
}

SubmissionReceipt.propTypes = {
  email: PropTypes.string,
  filingPeriod: PropTypes.string,
  receipt: PropTypes.string,
  timestamp: PropTypes.number,
  status: PropTypes.object,
  isFetching: PropTypes.bool
}

export default SubmissionReceipt
