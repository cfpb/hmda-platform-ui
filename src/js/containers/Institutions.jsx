import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { updateFilingPeriod, fetchInstitutions, createNewSubmission, fetchCSV } from '../actions'
import Institutions from '../components/Institutions.jsx'

class InstitutionContainer extends Component {
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

function mapStateToProps(state) {
  const {
    isFetching,
    institutions
  } = state.app.institutions || {
    isFetching: true,
    institutions: []
  }

  const {
    filings
  } = state.app || {
    filings: []
  }

  const user = state.oidc && state.oidc.user || null

  return {
    isFetching,
    institutions,
    filings,
    user
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
    onDownloadClick: (institutionId, submissionId, filing) => {
      dispatch(fetchCSV(institutionId, filing, submissionId))
    },
    dispatch
  }
}

InstitutionContainer.defaultProps = {
  user: null
}

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionContainer)
