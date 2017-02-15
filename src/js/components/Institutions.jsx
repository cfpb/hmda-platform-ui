import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import UserHeading from './UserHeading.jsx'
import Header from './Header.jsx'
import RefileButton from '../containers/RefileButton.jsx'
import moment from 'moment'

const renderTiming = (status, start, end) => {
  // default to code 1, not-started
  let messageClass
  let timing

  switch (status.code) {
    // not-started
    case 1:
      messageClass = 'text-secondary'
      timing = null
      break
    // in-progress
    case 2:
      messageClass = 'text-primary'
      timing = `Started ${moment(start).fromNow()}`
      break
    // completed
    case 3:
      messageClass = 'text-green'
      timing = `Compoleted ${moment(end).format('MMMM Do')}`
      break
    // code 4 is cancelled, do nothing ... defaults are fine
    default:
      messageClass = 'text-secondary'
      timing = null
  }

  return <p className="text-gray usa-text-small"><strong className={`${messageClass} text-uppercase`}>{status.message}</strong> {timing}</p>
}

const renderStatus = (code, institutionName, institutionId, period) => {
  let status

  switch (code) {
    // not started
    case 1:
      status = 'No filing started. You can begin filing now.'
      break
    // in progress
    case 2:
      status = 'The filing is being processed. You can view the progress.'
      break
    // completed
    case 3:
      status = 'The filing is complete and signed. You can review the signed submission.'
      break
    // cancelled
    case 4:
      status = 'The latest filing has been cancelled. You can review the cancelled submission or submit a new file.'
      break
    default:
      status = 'No filing started. You can begin filing now.'
  }

  return <p className="status">{status}</p>
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
        <UserHeading period="2017" userName={this.props.user.profile.name} />
        <div className="usa-width-two-thirds">
          {this.props.filings.map((filingObj, i) => {
            const filing = filingObj.filing
            const institution = getInstitutionFromFiling(institutions, filing)
            if(!institution) return
            return (
              <div key={i} className="usa-grid-full">
                <div className="institution">
                  {renderTiming(filing.status, filing.start, filing.end)}
                  <h2>{institution.name} - {institution.id}</h2>
                  {renderStatus(filing.status.code, institution.name, filing.institutionId, filing.period)}
                  {renderButton(filing.status.code, filing.institutionId, filing.period)}
                  <RefileButton id={filing.institutionId} filing={filing.period} code={filing.status.code}/>
                  <h5>Previous submissions for this filing</h5>
                  <ul className="usa-text-small usa-unstyled-list">
                    {filingObj.submissions.map((submission, i) => {
                      return (<li className="edit-report" key={i}><strong>{submission.id.sequenceNumber}</strong>. <a href="#" onClick={(e) => {e.preventDefault(); this.props.onDownloadClick(institution.id, filing.period, submission.id.sequenceNumber)}}>Download edit report</a> - <span className="text-gray">started on {moment(submission.start).format('MMMM Do, YYYY')}</span></li>)
                    })}
                  </ul>
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
