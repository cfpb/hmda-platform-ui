import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LoadingIcon from './LoadingIcon.jsx'
import ErrorWarning from './ErrorWarning.jsx'
import Institution from './Institution.jsx'
import InstitutionsHeader from './InstitutionsHeader.jsx'
import Alert from './Alert.jsx'
import * as STATUS from '../constants/statusCodes.js'

export const getInstitutionFromFiling = (institutions, filing) => {
  for (let i = 0; i < institutions.length; i++) {
    if (institutions[i].id === filing.institutionId) return institutions[i]
  }
  return null
}

const _isDataLoading = filings => {
  if (!filings.fetched || filings.isFetching) {
    return true
  }

  return false
}

const _doesFilingExist = filings => {
  if (filings.fetched && filings.filings.length === 0) {
    return false
  }

  return true
}

const _setSubmission = (submission, filing, filingObj) => {
  if (submission.id && submission.id.institutionId === filing.institutionId) {
    return submission
  }

  return filingObj.submissions[0]
}

export default class Institutions extends Component {
  render() {
    return (
      <main id="main-content" className="usa-grid Institutions">
        {this.props.error ? <ErrorWarning error={this.props.error} /> : null}
        <div className="usa-width-one-whole">
          {this.props.filingPeriod ? (
            <InstitutionsHeader filingPeriod={this.props.filingPeriod} />
          ) : null}

          {_isDataLoading(this.props.filings) ? (
            <LoadingIcon />
          ) : _doesFilingExist(this.props.filings) ? (
            this.props.filings.filings.map((filingObj, i) => {
              const filing = filingObj.filing
              const submission = _setSubmission(
                this.props.submission,
                filing,
                filingObj
              )
              const institution = getInstitutionFromFiling(
                this.props.institutions,
                filing
              )
              if (!institution) return

              return (
                <Institution
                  key={i}
                  filing={filing}
                  institution={institution}
                  onDownloadClick={this.props.onDownloadClick}
                  submission={submission}
                  submissions={filingObj.submissions}
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

          <Alert type="info">
            <p>
              If you are planning to file on behalf of more than one financial
              institution, contact{' '}
              <a href="mailto:hmdahelp@cfpb.gov">hmdahelp@cfpb.gov</a>.
            </p>
          </Alert>
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
