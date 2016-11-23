import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import UserHeading from '../components/UserHeading.jsx'
import moment from 'moment'

const renderLabel = (status) => {
  let bgColor = 'bg-color-red'
  if(status.code === 2) {
    color = ''
  }
  if(status.code === 3) {
    bgColor = 'bg-color-green'
  }
  return <span className={`usa-label ${bgColor}`}>{status.message}</span>
}

const renderTiming = (start, end) => {
  let timing = <p className="text-gray usa-text-small text-uppercase"><strong className="text-primary">Started</strong> {moment(start).fromNow()}</p>

  if(start === 0) timing = <p className="text-gray usa-text-small text-uppercase"><strong className="text-secondary">Not started</strong></p>

  if(end !== 0) timing = <p className="text-gray usa-text-small text-uppercase"><strong className="text-green">Completed</strong> {moment(end).format('MMMM Do')}</p>

  return timing
}

const renderStatus = (code, institutionName, institutionId, period) => {
  let status = <p>{institutionName} hasn't started a filing yet. You can <Link to={`/${institutionId}/${period}`}>begin filing</Link> now.</p>

  switch(code) {
    case 2:
      status = <p>{institutionName}'s file is being processed. You can <Link to={`/${institutionId}/${period}`}>view the progress</Link> now.</p>
    case 3:
      status = <p>{institutionName}'s file has been processed. You can <Link to={`/${institutionId}/${period}`}>review edits and sign</Link> {institutionName}'s submission now.</p>
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
              {renderTiming(filing.start, filing.end)}
              <h2>{institution.name}</h2>
              {/*{renderLabel(filing.status)}*/}
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
