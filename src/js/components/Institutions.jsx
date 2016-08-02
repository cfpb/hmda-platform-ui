import React, { Component, PropTypes } from 'react'

export default class Institution extends Component {

  render() {
    return (
      <div className="InstitutionStatus">
        {this.props.filings.map(function(filing, i){
          return (
            <div key={i}>
              <h3>{filing.institution.name}</h3>
                {filing.filings.map(function(filing, i){
                  return (
                    <div key={i}>
                      <p>id: {filing.id}</p>
                      <p>fid: {filing.fid}</p>
                      <p>status: {filing.status}</p>
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
  filings: []
}
Institution.propTypes = {
  params: PropTypes.object,
  filings: PropTypes.array,
  dispatch: PropTypes.func.isRequired
}
