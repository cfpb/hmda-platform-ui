import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../common/Alert.jsx'
import FilingPeriodSelector from '../common/FilingPeriodSelectorContainer.jsx'
import { beforeFilingPeriod, afterFilingPeriod, isBeta } from '../utils/date.js'

const InstitutionsHeader = ({ filingPeriod }) => {
  if (!filingPeriod) return null
  const closed = afterFilingPeriod(filingPeriod)
  let body

  if (beforeFilingPeriod(filingPeriod)) {
    if (isBeta(filingPeriod)) {
      body = (
        <Alert
          heading={`The ${filingPeriod} filing period is not yet open.`}
          type="warning"
        >
          <p>
            The beta {filingPeriod} HMDA Platform is available to upload, test,
            and validate HMDA data.
          </p>
        </Alert>
      )
    } else {
      body = (
        <Alert
          heading={`The ${filingPeriod} filing period is not yet open.`}
          type="warning"
        >
          <p>
            A beta period will begin soon for you to upload, test, and validate
            HMDA data.
          </p>
        </Alert>
      )
    }
  } else if (closed) {
    body = (
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
  } else {
    body = (
      <React.Fragment>
        <p className="usa-font-lead">
          The filing period is open. March 1st, {filingPeriod} is the deadline
          to submit your HMDA data.
        </p>
        <p className="usa-font-lead">
          You may file HMDA data for your authorized institutions below.
        </p>
      </React.Fragment>
    )
  }
  return (
    <header>
      <h2 className={closed ? 'closedFilingPeriod' : ''}>
        <FilingPeriodSelector /> filing period{closed ? ' (closed)' : ''}
      </h2>
      {body}
    </header>
  )
}

InstitutionsHeader.propTypes = {
  filingPeriod: PropTypes.string
}

export default InstitutionsHeader
