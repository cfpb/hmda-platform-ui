import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchInstitutions from '../actions/fetchInstitutions.js'
import Institutions from './index.jsx'

export class InstitutionContainer extends Component {
  componentDidMount() {
    if (!this.props.institutions.fetched && !this.props.institutions.isFetching)
      this.props.dispatch(fetchInstitutions())
  }

  render() {
    return <Institutions {...this.props} />
  }
}

export function mapStateToProps(state) {
  const { institutions, filings, submission, error, filingPeriod } = state.app

  return {
    submission,
    filingPeriod,
    institutions,
    filings,
    error
  }
}

export default connect(mapStateToProps)(InstitutionContainer)
