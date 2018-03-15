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

const _whatToRender = ({ filings, filingPeriod, institutions, submission }) => {
  if (!institutions.fetched) return <Loading />

  // sorted to keep the listing consistent
  const sortedInstitutions = Object.keys(institutions.institutions).sort(
    sortInstitutions
  )
  return sortedInstitutions.map((key, i) => {
    const institution = institutions.institutions[key]

    if (
      institution.filings.filter(v => v.period === filingPeriod).length === 0
    ) {
      return (
        <Institution
          key={i}
          filingPeriod={filingPeriod}
          institution={institution}
        />
      )
    }

    const filingsByPeriod = filings[institution.id]
    if (!filingsByPeriod) return <Loading key={i} />

    const filingsObj = filingsByPeriod[filingPeriod]
    if (!filingsObj || !filingsObj.fetched) {
      // filings are not fetched yet
      return <Loading key={i} />
    } else {
      // we have good stuff
      const filing = filingsObj.filing
      return (
        <Institution
          key={i}
          filing={filing.filing}
          filingPeriod={filingPeriod}
          institution={institution}
          submission={_setSubmission(submission, filing)}
          submissions={filing.submissions}
        />
      )
    }
  })
}

export default class Institutions extends Component {
  render() {
    const { error, filingPeriod } = this.props

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
  submission: PropTypes.object,
  error: PropTypes.object,
  filings: PropTypes.object,
  filingPeriod: PropTypes.string,
  institutions: PropTypes.object
}
