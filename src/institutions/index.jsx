import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../common/Loading.jsx'
import ErrorWarning from '../common/ErrorWarning.jsx'
import Institution from './Institution.jsx'
import InstitutionsHeader from './Header.jsx'
import sortInstitutions from '../utils/sortInstitutions.js'
import Alert from '../common/Alert.jsx'

const _setSubmission = (submission, filingObj) => {
  if (
    submission.id &&
    submission.id.institutionId === filingObj.filing.institutionId
  ) {
    return submission
  }

  return filingObj.submissions[0]
}

const _whatToRender = ({
  filings,
  filingPeriod,
  institutions,
  submission,
  onDownloadClick
}) => {
  // we don't have institutions yet
  if (!institutions.fetched) return <Loading />

  // we don't have any institutions
  // this shouldn't happen because they need to pick
  // an institution when registering but just in case
  if (institutions.institutions.length === 0)
    return (
      <Alert type="error">
        <p>
          There was an error getting your list of institutions, please refresh
          the page or try again later. If the problem persists, contact{' '}
          <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.
        </p>
      </Alert>
    )

  // sorted to keep the listing consistent
  const sortedInstitutions = Object.keys(institutions.institutions).sort(
    sortInstitutions
  )
  return sortedInstitutions.map((key, i) => {
    const institution = institutions.institutions[key]
    const institutionFilings = filings[institution.id]

    if (!institutionFilings) {
      // there are no filings
      return <Institution key={i} institution={institution} />
    } else if (!institutionFilings.fetched) {
      // filings are not fetched yet
      return <Loading key={i} />
    } else {
      // we have good stuff
      const filingObj = institutionFilings.filing
      return (
        <Institution
          key={i}
          filing={filingObj.filing}
          institution={institution}
          onDownloadClick={onDownloadClick}
          submission={_setSubmission(submission, filingObj)}
          submissions={filingObj.submissions}
        />
      )
    }
  })
}

export default class Institutions extends Component {
  render() {
    const {
      error,
      filings,
      filingPeriod,
      institutions,
      submission,
      onDownloadClick
    } = this.props

    return (
      <main id="main-content" className="usa-grid Institutions">
        {error ? <ErrorWarning error={error} /> : null}
        <div className="usa-width-one-whole">
          {filingPeriod ? (
            <InstitutionsHeader filingPeriod={filingPeriod} />
          ) : null}

          {_whatToRender(this.props)}

          <p className="multi-message">
            If you are planning to file on behalf of more than one financial
            institution, contact{' '}
            <a href="mailto:hmdahelp@cfpb.gov">hmdahelp@cfpb.gov</a>.
          </p>
        </div>
      </main>
    )
  }
}

Institutions.propTypes = {
  error: PropTypes.object,
  filings: PropTypes.object,
  filingPeriod: PropTypes.string,
  institutions: PropTypes.object,
  submission: PropTypes.object,
  onDownloadClick: PropTypes.func
}
