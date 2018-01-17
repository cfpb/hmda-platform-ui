import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../common/Alert.jsx'
import { withinFilingPeriod } from '../utils/date.js'

const InstitutionsHeader = ({ filingPeriod }) => {
  if (!filingPeriod) return null

  const filingPeriodPlusOne = parseInt(filingPeriod, 10) + 1
  if (withinFilingPeriod(filingPeriodPlusOne)) {
    return (
      <header>
        <h2>{filingPeriod} filing period</h2>
        <p className="usa-font-lead">
          The filing period is open. March 1st, {filingPeriodPlusOne} is the deadline to submit your HMDA data.
        </p>
        <p className="usa-font-lead">You may file HMDA data for your authorized
          institutions below.
        </p>
        <p>
          Your progress will be saved if you leave the platform before
          completing your filing.
        </p>
      </header>
    )
  } else {
    // acts as header outside of the filing period
    return (
      <Alert heading="The filing period is closed." type="warning">
        <p>
          The HMDA Platform remains available outside of the filing period to
          upload, test, and validate HMDA data.
        </p>
      </Alert>
    )
  }
}

InstitutionsHeader.propTypes = {
  filingPeriod: PropTypes.string
}

export default InstitutionsHeader
