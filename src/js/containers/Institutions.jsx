import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import updateFilingPeriod from '../actions/updateFilingPeriod.js'
import fetchInstitutions from '../actions/fetchInstitutions.js'
import createNewSubmission from '../actions/createNewSubmission.js'
import fetchCSV from '../actions/fetchCSV.js'
import Institutions from '../components/Institutions.jsx'

export class InstitutionContainer extends Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {
    this.props.dispatch(updateFilingPeriod('2017')) //env.FILING_PERIOD
    this.props.dispatch(fetchInstitutions())
  }

  render() {
    if(!this.props.user) return null
    return <Institutions {...this.props} />
  }
}

export function mapStateToProps(state) {
  const {
    institutions
  } = state.app.institutions

  const {
    filings,
    isFetching
  } = state.app.filings

  const error = state.app.error

  const { filingPeriod } = state.app

  return {
    isFetching,
    filingPeriod,
    institutions,
    filings,
    error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    makeNewSubmission: (id, filing) => {
      return dispatch(createNewSubmission(id, filing)).then(()=>{
        browserHistory.push(`/${id}/${filing}`)
      })
    },
    // triggered by a click on "Download edit report"
    onDownloadClick: (institutionId, filing, submissionId) => {
      dispatch(fetchCSV(institutionId, filing, submissionId))
    },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionContainer)
