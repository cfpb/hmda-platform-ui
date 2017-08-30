import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InstitutionsHeader from './InstitutionsHeader'
import InstitutionNameAndId from './InstitutionNameAndId'
import InstitutionStatus from './InstitutionStatus'
import InstitutionViewButton from './InstitutionViewButton'
import InstitutionRefile from './InstitutionRefile'
import InstitutionPreviousSubmissions from './InstitutionPreviousSubmissions'
import LoadingIcon from './LoadingIcon.jsx'
import ErrorWarning from './ErrorWarning.jsx'
import { withinFilingPeriod } from '../utils/date.js'
import Alert from './Alert.jsx'
import * as STATUS from '../constants/statusCodes.js'

export const getInstitutionFromFiling = (institutions, filing) => {
  for (let i = 0; i < institutions.length; i++) {
    if (institutions[i].id === filing.institutionId) return institutions[i]
  }
  return null
}

export default class Institution extends Component {
  render() {
    const institutions = this.props.institutions
    const makeNewSubmission = this.props.makeNewSubmission

    return (
      <main id="main-content" className="usa-grid Institutions">
        {this.props.error ? <ErrorWarning error={this.props.error} /> : null}
        <div className="usa-width-one-whole">
          {this.props.filingPeriod ? withinFilingPeriod(
            this.props.filingPeriod
          ) ? (
            <InstitutionsHeader filingPeriod={this.props.filingPeriod} />
          ) : (
            <Alert type="warning" heading="The filing period is closed.">
              <p>
                The platform remains available outside of the filing period to
                upload, test, and validate HMDA data.
              </p>
            </Alert>
          ) : null}
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
              const status = submission && submission.status
              const institution = getInstitutionFromFiling(institutions, filing)

              if (!institution) return
              return (
                <div key={i} className="usa-grid-full">
                  <section className="institution">
                    <div className="current-status">
                      <InstitutionNameAndId
                        name={institution.name}
                        id={institution.id}
                      />

                      <InstitutionStatus
                        institutionId={institution.id}
                        filing={filing}
                        submission={submission}
                        onDownloadClick={this.props.onDownloadClick}
                      />

                      <InstitutionViewButton
                        status={status}
                        institutionId={institution.id}
                        filingPeriod={filing.period}
                      />

                      <InstitutionRefile status={status} filing={filing} />
                    </div>

                    <InstitutionPreviousSubmissions
                      submissions={filingObj.submissions}
                      institutionId={institution.id}
                      filingPeriod={filing.period}
                      onDownloadClick={this.props.onDownloadClick}
                    />
                  </section>
                </div>
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

Institution.propTypes = {
  params: PropTypes.object,
  filings: PropTypes.object,
  institutions: PropTypes.array,
  makeNewSubmission: PropTypes.func,
  onDownloadClick: PropTypes.func
}
