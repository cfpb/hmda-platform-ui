import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import LoadingIcon from './LoadingIcon.jsx'
import ErrorWarning from './ErrorWarning.jsx'
import RefileButton from '../containers/RefileButton.jsx'
import { ordinal } from '../utils/date.js'
import Alert from './Alert.jsx'
import * as STATUS from '../constants/statusCodes.js'
import 'uswds'

const defaultSubmission = {
  status: {
    code: STATUS.CREATED,
    message: 'not started',
    description: 'You may begin your filing process by selecting the "Begin Filing" button below.'
  }
}
export const renderStatus = (
  institutionId,
  filing,
  submission = defaultSubmission,
  onDownloadClick
) => {
  const statusCode = submission.status.code
  const period = filing.period
  const filingStatus = filing.status.code
  let messageClass

  if (statusCode === STATUS.CREATED) {
    messageClass = 'text-secondary'
  }

  if (statusCode > STATUS.CREATED) {
    messageClass = 'text-primary'
  }

  if (
    statusCode === STATUS.PARSED_WITH_ERRORS ||
    statusCode === STATUS.VALIDATED_WITH_ERRORS
  ) {
    messageClass = 'text-secondary'
  }

  if (statusCode === STATUS.SIGNED) {
    messageClass = 'text-green'
  }

  // failed submission
  if (statusCode === STATUS.FAILED) {
    messageClass = 'text-secondary'
  }

  return (
    <section className="status">
      <h4>
        Filing status: <strong className={messageClass}>{submission.status.message}</strong>
      </h4>
      <p>
        {submission.status.description}
      </p>
      {
        filingStatus === 3 && statusCode !== STATUS.SIGNED
        ? <p className="usa-text-small">You have previously submitted a HMDA file and are in the process of refiling. If you do not complete your current refiling process, your original submission will be accepted for the current filing period.</p>
        : null
      }
      {statusCode > STATUS.VALIDATING
        ? <p className="usa-text-small">
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                onDownloadClick(institutionId, period, submission.id.sequenceNumber)
              }}
            >
              Download edit report
            </a>
          </p>
        : null}
    </section>
  )
}

export const renderViewButton = (status, institutionId, period) => {

  const code = status ? status.code : STATUS.CREATED
  let buttonText = 'View current filing'

  if(code === STATUS.CREATED){
    buttonText = 'Begin filing'
  }else if(code === STATUS.SIGNED){
    buttonText = 'View completed filing'
  }

  return (
    <Link
      className="status-button usa-button"
      to={`/${institutionId}/${period}`}
    >
      {buttonText}
    </Link>
  )
}

export const renderRefileButton = (status, filing) => {
  if (!status) return null
  if (
    status.code === STATUS.PARSED_WITH_ERRORS ||
    status.code > STATUS.VALIDATING
  ) {
    return (
      <RefileButton
        id={filing.institutionId}
        filing={filing.period}
        code={status.code}
        isLink={true}
        isSmall={true}
      />
    )
  } else {
    return null
  }
}

export const renderPreviousSubmissions = (
  submissions,
  onDownloadClick,
  institutionId,
  period
) => {
  if (!submissions.length) return
  const previousSubmissions = submissions.slice(1)
  if (!previousSubmissions.length) return
  return (
    <section className="previous-submissions">
      <ul className="usa-accordion-bordered">
        <li>
          <button
            className="usa-accordion-button"
            aria-expanded="false"
            aria-controls={`submissions-${institutionId}`}
          >
            History of your progress in this filing period
          </button>
          <div id={`submissions-${institutionId}`} className="usa-accordion-content">
            <p>The edit report for previous submissions that completed the valiation process can be downloaded in csv format below.</p>
            <ol reversed>
              {previousSubmissions.map((submission, i) => {
                // always use the uploaded date
                const startDate = ordinal(new Date(submission.start))
                const endDate = ordinal(new Date(submission.end))

                const signedOn = (submission.status.code === STATUS.SIGNED)
                  ? ` on ${endDate}`
                  : null

                // render a link if beyond VALIDATING
                // even signed submissions could have an edit report
                // because quality and macro are verified
                if (submission.status.code > STATUS.VALIDATING) {
                  return (
                    <li key={i}>
                      Upload on {startDate} was <strong>{submission.status.message}</strong>{signedOn},{' '}
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault()
                          onDownloadClick(
                            institutionId,
                            period,
                            submission.id.sequenceNumber
                          )
                        }}
                      >
                        download the edit report
                      </a>.
                    </li>
                  )
                }

                // other statuses contain no edits
                return (
                  <li key={i}>
                    Upload on {startDate} was <strong>{submission.status.message}</strong>.
                  </li>
                )
              })}
            </ol>
          </div>
        </li>
      </ul>
    </section>
  )
}

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
          <header>
            {this.props.filingPeriod
              ? <h1>{this.props.filingPeriod} filing period</h1>
              : null}
              <p>The filing period is open. You may file HMDA data for your authorized institutions below.</p>
              <p>Your progress will be saved if you leave the platform before completing your filing.</p>
          </header>
          {!this.props.filings.fetched || this.props.filings.isFetching || this.props.submission.isFetching
            ? <LoadingIcon />
            : this.props.filings.fetched && this.props.filings.filings.length === 0
              ? <Alert type="error">
                  <p>
                    There is a problem with your filing. Please contact <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.
                  </p>
                </Alert>
              : this.props.filings.filings.map((filingObj, i) => {
                  const filing = filingObj.filing
                  const submission = this.props.submission.id &&
                    this.props.submission.id.institutionId === filing.institutionId
                    ? this.props.submission
                    : filingObj.submissions[0]
                  const status = submission && submission.status
                  const institution = getInstitutionFromFiling(
                    institutions,
                    filing
                  )

                  if (!institution) return
                  return (
                    <div key={i} className="usa-grid-full">
                      <section className="institution">
                        <div className="current-status">
                          <h3>{institution.name} - {institution.id}</h3>
                          {renderStatus(
                            institution.id,
                            filing,
                            submission,
                            this.props.onDownloadClick
                          )}

                          {renderViewButton(
                            status,
                            filing.institutionId,
                            filing.period
                          )}

                          {renderRefileButton(status, filing)}
                        </div>

                        {renderPreviousSubmissions(
                          filingObj.submissions,
                          this.props.onDownloadClick,
                          institution.id,
                          filing.period
                        )}
                      </section>
                    </div>
                  )
                })}

          <Alert type="info">
            <p>If you are planning to file on behalf of more than one financial institution, contact <a href="mailto:hmdahelp@cfpb.gov">hmdahelp@cfpb.gov</a>.</p>
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
