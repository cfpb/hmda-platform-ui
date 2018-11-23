import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../common/Loading.jsx'
import ErrorWarning from '../common/ErrorWarning.jsx'
import Institution from './Institution.jsx'
import InstitutionsHeader from './Header.jsx'
import sortInstitutions from '../utils/sortInstitutions.js'
import Alert from '../common/Alert.jsx'

import './Institutions.css'

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
  // we don't have institutions yet
  if (!institutions.fetched) return <Loading className="floatingIcon" />

  // we don't have any associated institutions
  // This is probably due to accounts from previous years

  if (Object.keys(institutions.institutions).length === 0)
    return (
      <Alert heading="No associated institutions" type="info">
        <p>
          In order to access the HMDA Platform, your institution must{' '}
          have a Legal Entity Identifier (LEI). In order to provide your{' '}
          institution&#39;s LEI, please access <a href="https://hmdahelp.consumerfinance.gov/accounthelp/">this form</a> and enter the{' '}
          necessary information, including your HMDA Platform account{' '}
          email address in the &#34;Additional comments&#34; text box. We will{' '}
          apply the update to your account, please check back 2 business{' '}
          days after submitting your information.
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

    if (!institutionFilings || !institutionFilings.fetched) {
      // filings are not fetched yet
      return <Loading className="floatingIcon" key={i} />
    } else {
      // we have good stuff
      const filingObj = institutionFilings.filing
      return (
        <Institution
          key={i}
          filing={filingObj.filing}
          institution={institution}
          submission={_setSubmission(submission, filingObj)}
          submissions={filingObj.submissions}
        />
      )
    }
  })
}

export default class Institutions extends Component {
  render() {
    const { error, filingPeriod } = this.props

    return (
      <main id="main-content" className="Institutions">
        {error ? <ErrorWarning error={error} /> : null}
        <div className="grid">
          {filingPeriod ? (
            <InstitutionsHeader filingPeriod={filingPeriod} />
          ) : null}

          {_whatToRender(this.props)}

          {this.props.institutions.fetched ? (
            <p className="multi-message">
              If you are planning to file on behalf of more than one financial
              institution, contact{' '}
              <a href="mailto:hmdahelp@cfpb.gov">hmdahelp@cfpb.gov</a>.
            </p>
          ) : null}
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
