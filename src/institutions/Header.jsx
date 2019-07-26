import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../common/Alert.jsx'
import { beforeFilingPeriod, afterFilingPeriod, isBeta } from '../utils/date.js'

const InstitutionsHeader = ({ filingPeriod }) => {
  if (!filingPeriod) return null

  if (isBeta(filingPeriod)) {
    return (
      <Alert
        heading={`The ${filingPeriod} filing period is not yet open.`}
        type="warning"
      >
        <p>
          The beta {filingPeriod} HMDA Platform is available to upload, test,
          and validate HMDA data. All test data uploaded during the beta
          period will be removed from the system when the filing period opens on
          January 1st, 2019.
        </p>
      </Alert>
    )
  }
  if (beforeFilingPeriod(filingPeriod)) {
    return (
      <Alert
        heading={`The ${filingPeriod} filing period is not yet open.`}
        type="warning"
      >
        <p>
          The Platform will begin accepting data for the {filingPeriod} filing period on January 1st.
        </p>
      </Alert>
    )
  } else if (afterFilingPeriod(filingPeriod)) {
    return (
      <Alert
        heading={`The ${filingPeriod} filing period is closed.`}
        type="warning"
      >
        <p>
          The HMDA Platform remains available outside of the filing period for
          late submissions and resubmissions of {filingPeriod} HMDA data.
        </p>
      </Alert>
    )
  }
  return (
    <Alert>
      <div>
        <h2 style={{ margin: '0 0 0.5em 0' }}>{filingPeriod} filing period</h2>
        <p className="font-lead">
          The filing period is open. March 1st, {+filingPeriod + 1} is the deadline to
          submit your HMDA data.
        </p>
        <p className="font-lead">
          You may file HMDA data for your authorized institutions below.
        </p>
      </div>
    </Alert>
  )
}

InstitutionsHeader.propTypes = {
  filingPeriod: PropTypes.string
}

export default InstitutionsHeader
