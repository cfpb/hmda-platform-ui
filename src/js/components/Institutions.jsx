import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LoadingIcon from './LoadingIcon.jsx'
import ErrorWarning from './ErrorWarning.jsx'
import Institution from './Institution.jsx'
import { withinFilingPeriod } from '../utils/date.js'
import Alert from './Alert.jsx'
import * as STATUS from '../constants/statusCodes.js'

export const renderHeaderOrAlert = filingPeriod => {
  if (!filingPeriod) return null

  if (withinFilingPeriod(filingPeriod)) {
    return <InstitutionsHeader filingPeriod={this.props.filingPeriod} />
  } else {
    return (
      <Alert type="warning" heading="The filing period is closed.">
        <p>
          The platform remains available outside of the filing period to upload,
          test, and validate HMDA data.
        </p>
      </Alert>
    )
  }
}

export const getInstitutionFromFiling = (institutions, filing) => {
  for (let i = 0; i < institutions.length; i++) {
    if (institutions[i].id === filing.institutionId) return institutions[i]
  }
  return null
}

export default class Institutions extends Component {
  render() {
    return (
      <main id="main-content" className="usa-grid Institutions">
        {this.props.error ? <ErrorWarning error={this.props.error} /> : null}
        <div className="usa-width-one-whole">
          {renderHeaderOrAlert(this.props.filingPeriod)}
          {!this.props.filings.fetched ||
          this.props.filings.isFetching ||
          this.props.submission.isFetching ? (
            <LoadingIcon />
          ) : this.props.filings.fetched &&
          this.props.filings.filings.length === 0 ? (
            <Alert type="error">
              <p>
                There is a problem with your filing. Please contact{' '}
                <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.
              </p>
            </Alert>
          ) : (
            this.props.filings.filings.map((filingObj, i) => {
              const filing = filingObj.filing
              const submission =
                this.props.submission.id &&
                this.props.submission.id.institutionId === filing.institutionId
                  ? this.props.submission
                  : filingObj.submissions[0]
              const institution = getInstitutionFromFiling(
                this.props.institutions,
                filing
              )
              if (!institution) return

              return (
                <Institution
                  key={i}
                  institution={institution}
                  filing={filing}
                  submission={submission}
                  submissions={filingObj.submissions}
                  onDownloadClick={this.props.onDownloadClick}
                />
              )
            })
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
  submission: PropTypes.object,
  filingPeriod: PropTypes.string,
  institutions: PropTypes.array,
  filings: PropTypes.object,
  error: PropTypes.object,
  onDownloadClick: PropTypes.func
}
