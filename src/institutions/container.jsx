import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchInstitutions from '../actions/fetchInstitutions.js'
import CSVDownload from '../common/CSVDownload.jsx'
import Institutions from './index.jsx'

export class InstitutionContainer extends Component {
  componentDidMount() {
    if (!this.props.institutions.fetched && !this.props.institutions.isFetching)
      this.props.dispatch(fetchInstitutions())
  }

  render() {
    return (
      <CSVDownload {...this.props}>
        <Institutions />
      </CSVDownload>
    )
  }
}

export function mapStateToProps(state) {
  const { institutions, filings, error, filingPeriod } = state.app

  return {
    filingPeriod,
    institutions,
    filings,
    error
  }
}

export default connect(mapStateToProps)(InstitutionContainer)
