import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { updateFilingPeriod, fetchInstitutions, createNewSubmission } from '../actions'
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
    makeNewSubmission = (id, period) => {
      return dispatch(createNewSubmission(id, period)).then(()=>{
        browserHistory.push(`/${id}/${period}`)
      })
    },
    // triggered by a click on "Download edit report"
    onDownloadClick = (id, period) => {
      dispatch(requestCSV(id, period))
    },
    dispatch
  }
}

InstitutionContainer.defaultProps = {
  user: null
}

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionContainer)
