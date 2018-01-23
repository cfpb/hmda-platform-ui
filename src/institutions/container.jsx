import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchInstitutions from './fetchInstitutions.js'
import fetchCSV from '../submission/fetchCSV.js'
import Institutions from './index.jsx'

export class InstitutionContainer extends Component {
  componentDidMount() {
    if (!this.props.institutions || !this.props.filings.fetched)
      this.props.dispatch(fetchInstitutions())
  }

  render() {
    return <Institutions {...this.props} />
  }
}

export function mapStateToProps(state) {
  const { institutions } = state.app.institutions

  const { filings, submission, error, filingPeriod } = state.app

  return {
    submission,
    filingPeriod,
    institutions,
    filings,
    error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onDownloadClick: (institutionId, filing, submissionId) => {
      dispatch(fetchCSV(institutionId, filing, submissionId))
    },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  InstitutionContainer
)
