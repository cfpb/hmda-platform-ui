import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../common/Loading.jsx'
import ErrorWarning from '../common/ErrorWarning.jsx'
import Institution from './Institution.jsx'
import InstitutionsHeader from './Header.jsx'
import sortInstitutions from '../utils/sortInstitutions.js'
import YearSelector from '../common/YearSelector.jsx'
import Alert from '../common/Alert.jsx'

import './Institutions.css'

const _setSubmission = (submission, filingObj) => {
  if (submission.id && submission.id.lei === filingObj.filing.lei) {
    return submission
  }

  return filingObj.submissions[0]
}

const wrapLoading = (i = 0) => {
  return (
    <div key={i} style={{ height: '100px' }}>
      <Loading className="floatingIcon" />
    </div>
  )
}

const _whatToRender = ({ filings, institutions, submission }) => {

  // we don't have institutions yet
  if (!institutions.fetched) return wrapLoading()
  // we don't have any associated institutions
  // This is probably due to accounts from previous years

  if (Object.keys(institutions.institutions).length === 0)
    return (
      <Alert heading="No associated institutions" type="info">
        <p>
          In order to access the HMDA Platform, your institution must have a
          Legal Entity Identifier (LEI). In order to provide your{' '}
          institution&#39;s LEI, please access{' '}
          <a href="https://hmdahelp.consumerfinance.gov/accounthelp/">
            this form
          </a>{' '}
          and enter the necessary information, including your HMDA Platform
          account email address in the &#34;Additional comments&#34; text box.
          We will apply the update to your account, please check back 2 business{' '}
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
    const institutionFilings = filings[institution.lei]

    if (!institutionFilings || !institutionFilings.fetched) {
      // filings are not fetched yet
      return wrapLoading(i)
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
    const { error, filingPeriod, location, config } = this.props
    return (
      <main id="main-content" className="Institutions usa-grid-full">
        {error ? <ErrorWarning error={error} /> : null}
        <div className="usa-width-one-whole">
          {filingPeriod ? (
            <InstitutionsHeader filingPeriod={filingPeriod} />
          ) : null}

          <YearSelector filingPeriod={filingPeriod} pathname={location.pathname} config={config} />

          {_whatToRender(this.props)}

          {this.props.institutions.fetched &&
          Object.keys(this.props.institutions.institutions).length !== 0 ? (
            <Alert
              heading="Missing an institution?"
              type="info"
              headingType="small"
            >
              <p className="text-small">
                In order to access the HMDA Platform, each of your institutions
                must have a Legal Entity Identifier (LEI). In order to provide
                your institution&#39;s LEI, please access{' '}
                <a href="https://hmdahelp.consumerfinance.gov/accounthelp/">
                  this form
                </a>{' '}
                and enter the necessary information, including your HMDA
                Platform account email address in the &#34;Additional
                comments&#34; text box. We will apply the update to your
                account, please check back 2 business days after submitting your
                information.
              </p>
            </Alert>
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
  institutions: PropTypes.object,
  config: PropTypes.object
}
