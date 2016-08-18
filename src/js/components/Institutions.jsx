import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Institution extends Component {

  render() {
    var self = this
    return (
    <div className="InstitutionStatus">
      {this.props.institutions.map((institution, i) => {
        return (
        <div key={i}>
          <h3>{institution.name}</h3>
          {self.props.filings.filter(
            filing => filing.institutionId === institution.id
          ).map((filing, i) => {
            return (
            <div key={i}>
              <p>id: {filing.id}</p>
              <p>institutionId: {filing.institutionId}</p>
              <p>status: {filing.status}</p>
              <p><Link to={`/${filing.institutionId}/${filing.id}`}>View filing</Link></p>
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
