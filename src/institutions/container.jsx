import React, { Component } from 'react'
import { connect } from 'react-redux'
import requestInstitutions from '../actions/requestInstitutions.js'
import fetchEachInstitution from '../actions/fetchEachInstitution.js'
import receiveInstitutions from '../actions/receiveInstitutions.js'
import Institutions from './index.jsx'
import { getKeycloak } from '../utils/keycloak.js'

export class InstitutionContainer extends Component {
  componentDidMount() {
    if (!this.props.institutions.fetched && !this.props.institutions.isFetching)
      this.props.dispatch(requestInstitutions())

    const leiString = getKeycloak().tokenParsed.lei
    const leis = leiString ? leiString.split(',') : []

    // create the expected objects from the array, institutions = [{lei: lie}, {lei: lei}]
    let institutions = []
    leis.forEach(lei => {
      institutions.push({ lei: lei, year: this.props.params['year'] })
    })
    this.props.dispatch(fetchEachInstitution(institutions))

    this.props.dispatch(receiveInstitutions())
  }

  render() {
    return <Institutions {...this.props} />
  }
}

export function mapStateToProps(state) {
  const { institutions, filings, submission, error, filingPeriod, year } = state.app

  return {
    submission,
    filingPeriod,
    institutions,
    filings,
    error,
    year
  }
}

export default connect(mapStateToProps)(InstitutionContainer)
