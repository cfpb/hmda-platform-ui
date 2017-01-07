import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { updateFilingPeriod, fetchInstitutions, createNewSubmission } from '../actions'
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

export function mapDispatchToProps(dispatch){
  const makeNewSubmission = (id, period) => {
    return dispatch(createNewSubmission(id, period)).then(()=>{
      browserHistory.push(`/${id}/${period}`)
    })
  }

  return { makeNewSubmission, dispatch }
}

InstitutionContainer.defaultProps = {
  user: null
}

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionContainer)
