import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import UserHeading from './UserHeading.jsx'
import Header from './Header.jsx'
import RefileButton from '../containers/RefileButton.jsx'
import moment from 'moment'

const renderTiming = (submissionStatus, start, end) => {
  if(submissionStatus.code === null) return

  let messageClass
  let timing

  // submission created
  if(submissionStatus.code === 1) {
    messageClass = 'text-secondary'
    timing = 'Submission is created but not started'
  }

  // any submission status but created or signed
  if(submissionStatus.code > 1) {
    messageClass = 'text-primary'
    timing = `Started ${moment(start).fromNow()}`
  }

  // if its parsed with errors or validated with errors
  if(submissionStatus.code === 5 || submissionStatus.code === 8) {
    messageClass = 'text-secondary'
  }

  // signed (completed)
  if(submissionStatus.code === 11) {
    messageClass = 'text-green'
    timing = `Completed ${moment(end).format('MMMM Do')}`
  }

  // failed submission
  if(submissionStatus.code === -1) {
    messageClass = 'text-secondary'
    timing = `Submission failed ${moment(start).fromNow()}`
  }

  return (
    <div className="timing usa-text-small">
      <p><strong className={`${messageClass} text-uppercase`}>{submissionStatus.message}</strong></p>
      <p>{timing}</p>
    </div>
  )
}

const renderStatusMessage = (submissionStatus) => {
  let statusMessage
  const { code, message } = submissionStatus

  // created
  if(code === 1) {
    statusMessage = 'A submission has been created and is ready for a file upload.'
  }

  // in progress
  if(code > 1 && code < 8) {
    statusMessage = 'Your file is currently being processed.'
  }

  // failed parser
  if(code === 5) {
    statusMessage = 'Your file failed to parse and will need to be fixed and re-submitted.'
  }

  // has edits
  if(code === 8) {
    statusMessage = `Your submission has been ${message}.`
  }

  // validated
  if(code === 9) {
    statusMessage = `Your submission has been ${message} and is ready to be signed.`
  }

  // signed
  if(code === 11) {
    statusMessage = `Your submission has been ${message}. Thank you!`
  }

  return <p className="status">{statusMessage}</p>
}

const renderButton = (code, institutionId, period) => {
  let buttonText

  switch (code) {
    // not-started
    case 1:
      buttonText = 'File now'
      break
    // in progress
    case 2:
      buttonText = 'View filing'
      break
    // completed
    case 3:
      buttonText = 'View filing'
      break
    // cancelled
    case 4:
      buttonText = 'File now'
      break
  }

  return <Link className="status-button usa-button" to={`/${institutionId}/${period}`}>{buttonText}</Link>
}

const renderPreviousSubmissions = (submissions, onDownloadClick, institutionId, period) => {
  return (
    <div className="previous-submissions">
      <h5>Previous submissions for this filing</h5>

      <ol reversed className="usa-text-small">
        {submissions.map((submission, i) => {
          // render the end date if it was signed
          const date = (submission.status.code === 11) ? moment(submission.end).format('MMMM Do, YYYY') : moment(submission.start).format('MMMM Do, YYYY')

          // render a link if validted with errors
          if(submission.status.code === 8) {
            return (
              <li className="edit-report" key={i}>
                <a href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onDownloadClick(
                      institutionId,
                      period,
                      submission.id.sequenceNumber
                    )
                  }
                }>Download edit report</a> <strong>{submission.status.message}</strong> on {date}.
              </li>
            )
          }

          // other statuses contain no edits
          return (
            <li className="edit-report" key={i}>
              Submission on {date} was <strong>{submission.status.message}</strong> and has no edits.
            </li>
          )

        })}
      </ol>
    </div>
  )
}

const getInstitutionFromFiling = (institutions, filing) => {
  for(let i=0; i<institutions.length; i++){
    if(institutions[i].id === filing.institutionId) return institutions[i]
  }
  return null
}

export default class Institution extends Component {
  render() {
    const institutions = this.props.institutions
    const makeNewSubmission = this.props.makeNewSubmission
    return (
    <div className="Institutions">
      <Header
        pathname={this.props.location.pathname}
        userName={this.props.user.profile.name} />
      <div id="main-content" className="usa-grid">
        <UserHeading
          period="2017"
          userName={this.props.user.profile.name} />
        <div className="usa-width-two-thirds">
          {this.props.filings.map((filingObj, i) => {
            const filing = filingObj.filing
            const latestSubmissionStatus = filingObj.submissions[0] && filingObj.submissions[0].status || null
            const institution = getInstitutionFromFiling(institutions, filing)
            if(!institution) return
            return (
              <div key={i} className="usa-grid-full">
                <div className="institution">
                  <div className="current-status">
                    {renderTiming(
                      latestSubmissionStatus,
                      filing.start,
                      filing.end
                    )}

                    <h2>{institution.name} - {institution.id}</h2>

                    {renderStatusMessage(latestSubmissionStatus)}

                    {renderButton(
                      filing.status.code,
                      filing.institutionId,
                      filing.period
                    )}

                    <RefileButton
                      id={filing.institutionId}
                      filing={filing.period}
                      code={filing.status.code} />
                  </div>

                  {renderPreviousSubmissions(
                    filingObj.submissions,
                    this.props.onDownloadClick,
                    institution.id,
                    filing.period
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="content usa-width-one-third">
          <p>We can use this area as some help text and talk about the process or whatever else we need to mention.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec auctor nisl. Nam ut justo nec ligula aliquam pretium et at orci. Nulla pulvinar feugiat tellus, in sagittis sem sollicitudin at. Nunc nec libero at elit consectetur elementum eu at nisl.</p>
          <p>Curabitur molestie felis massa, vel semper nulla maximus nec. Quisque feugiat nulla nec urna tristique varius. Ut vulputate felis mi, non elementum lacus tempor ut. Etiam tempus porta arcu non venenatis. Vivamus nec tellus eleifend, pulvinar sapien sed, posuere leo.</p>
        </div>
      </div>
    </div>
    )
  }
}

Institution.defaultProps = {
  filings: [],
  institutions: [],
  user: {profile: {name:null}}
}

Institution.propTypes = {
  params: PropTypes.object,
  filings: PropTypes.array,
  user: PropTypes.object,
  institutions: PropTypes.array,
  makeNewSubmission: PropTypes.func,
  onDownloadClick: PropTypes.func
}
