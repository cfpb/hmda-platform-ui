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
          The platform remains available outside of the filing period to upload,
          test, and validate HMDA data. During this beta period, you may explore
          the new HMDA platform. It will be used to upload your financial
          institution's loan/application registers, review edits, certify the
          data, and submit the data for the filing year. All test data uploaded
          and accounts created during the beta period will be removed from the
          system when the filing period for HMDA data collected in 2017 opens on
          January 1st, 2018.
        </p>
      </Alert>
    )
  }
}

InstitutionsHeader.propTypes = {
  filingPeriod: PropTypes.string
}

export default InstitutionsHeader
