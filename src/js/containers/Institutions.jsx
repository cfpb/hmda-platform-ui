import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchInstitutions from '../actions/fetchInstitutions.js'
import fetchCSV from '../actions/fetchCSV.js'
import Institutions from '../components/Institutions.jsx'
import sortFilings from '../utils/sortFilings.js'

export class InstitutionContainer extends Component {
  constructor(props) {
    super(props)
  }

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
  const { submission, error, filingPeriod } = state.app
  const unsortedFilings = state.app.filings

  let filings = unsortedFilings
  filings.filings = unsortedFilings.filings.sort(sortFilings)

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
