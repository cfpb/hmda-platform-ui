import React from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'
import { withinFilingPeriod } from '../utils/date.js'

const InstitutionsHeader = ({ filingPeriod }) => {
  if (!filingPeriod) return null
  if (withinFilingPeriod(filingPeriod)) {
    return (
      <header>
        <h1>{filingPeriod} filing period</h1>
        <p>
          The filing period is open. You may file HMDA data for your authorized
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
