import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import UserHeading from '../components/UserHeading.jsx'
import moment from 'moment'

const renderTiming = (status, start, end) => {
  // default to code 1, not-started
  let messageClass = 'text-secondary'
  let timing = null

  switch(status.code) {
    // in-progress
    case 2:
      messageClass = 'text-primary'
      timing = moment(start).fromNow()
    // completed
    case 3:
      messageClass = 'text-green'
      timing = moment(end).format('MMMM Do')
    // code 4 is cancelled, do nothing ... defaults are fine
  }

  return <p className="text-gray usa-text-small text-uppercase"><strong className={messageClass}>{status.message}</strong> {timing}</p>
}

const renderStatus = (code, institutionName, institutionId, period) => {
  let status = <p>{institutionName} hasn't started a filing yet. You can <Link to={`/${institutionId}/${period}`}>begin filing</Link> now.</p>

  switch(code) {
    case 2:
      status = <p>{institutionName}'s filing is being processed. You can <Link to={`/${institutionId}/${period}`}>view the progress</Link> now.</p>
    case 3:
      status = <p>{institutionName}'s filing has been processed. You can <Link to={`/${institutionId}/${period}`}>review edits and sign</Link> {institutionName}'s submission now.</p>
    case 4:
      status = <p>{institutionName}'s filing is complete and signed. You can <Link to={`/${institutionId}/${period}`}>review</Link> {institutionName}'s signed submission now.</p>
  }

  return status
}

export default class Institution extends Component {
  render() {
    var self = this
    return (
    <div className="Institutions">
      <UserHeading period="2017" userName={this.props.user.profile.name} />
      {this.props.institutions.map((institution, i) => {
        return (
        <div key={i} className="institution">
          {self.props.filings.filter(
            filing => filing.institutionId === institution.id
          ).map((filing, i) => {
            return (
            <div key={i}>
              {renderTiming(filing.status, filing.start, filing.end)}
              <h2>{institution.name}</h2>
              {renderStatus(filing.status.code, institution.name, filing.institutionId, filing.period)}
            </div>
            )
          })}
        </div>
        )
      })}
    </div>
    )
  }
}

Institution.defaultProps = {
  filings: [],
  institutions: []
}

Institution.propTypes = {
  params: PropTypes.object,
  filings: PropTypes.array,
  institutions: PropTypes.array,
  dispatch: PropTypes.func.isRequired
}
