import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../common/Loading.jsx'
import ErrorWarning from '../common/ErrorWarning.jsx'
import Institution from './Institution.jsx'
import InstitutionsHeader from './Header.jsx'
import Alert from '../common/Alert.jsx'

const _setSubmission = (submission, filing) => {
  if (
    submission.id &&
    submission.id.institutionId === filing.filing.institutionId
  ) {
    return submission
  }

  return filing.submissions[0]
}

export const getFilingFromInstitution = (institution, filings) => {
  if (!filings || !filings.filings) return null

  for (let i = 0; i < filings.filings.length; i++) {
    if (institution.id === filings.filings[i].filing.institutionId) {
      return filings.filings[i]
    }
  }

  return null
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

          {!filings.fetched || filings.isFetching ? (
            <Loading />
          ) : institutions && institutions.length !== 0 ? (
            institutions.map((institution, i) => {
              const filing = getFilingFromInstitution(institution, filings)

              if (!filing)
                return <Institution key={i} institution={institution} />

              return (
                <Institution
                  key={i}
                  filing={filing.filing}
                  institution={institution}
                  onDownloadClick={onDownloadClick}
                  submission={_setSubmission(submission, filing)}
                  submissions={filing.submissions}
                />
              )
            })
          ) : (
            <Alert type="error">
              <p>
                There is a problem with your filing. Please contact{' '}
                <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.
              </p>
            </Alert>
          )}

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
  institutions: PropTypes.array,
  submission: PropTypes.object,
  onDownloadClick: PropTypes.func
}
