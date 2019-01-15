import React, { Component } from 'react'
/*import { connect } from 'react-redux'
import requestInstitutions from '../actions/requestInstitutions.js'
import fetchEachInstitution from '../actions/fetchEachInstitution.js'
import receiveInstitutions from '../actions/receiveInstitutions.js'
import Institutions from './index.jsx'
import { getKeycloak } from '../utils/keycloak.js'*/

import Alert from '../common/Alert.jsx'
import './Institutions.css'

export class InstitutionContainer extends Component {
  /*componentDidMount() {
    if (!this.props.institutions.fetched && !this.props.institutions.isFetching)
      this.props.dispatch(requestInstitutions())

    const leiString = getKeycloak().tokenParsed.lei
    const leis = leiString ? leiString.split(',') : []

    // create the expected objects from the array, institutions = [{lei: lie}, {lei: lei}]
    let institutions = []
    leis.forEach(lei => {
      institutions.push({ lei: lei })
    })
    this.props.dispatch(fetchEachInstitution(institutions))

    this.props.dispatch(receiveInstitutions())
  }*/

  render() {
    return (
      <main id="main-content" className="Institutions usa-grid-full">
        <div className="usa-width-one-whole">
          <Alert
            heading="Sorry, the HMDA Platform is currently unavailable."
            type="error"
          >
            <p>
              We are working to resolve the issue as soon as possible. Please
              try back again soon.
            </p>
          </Alert>
        </div>
      </main>
    )
    //return <Institutions {...this.props} />
  }
}

/*export function mapStateToProps(state) {
  const { institutions, filings, submission, error, filingPeriod } = state.app

  return {
    submission,
    filingPeriod,
    institutions,
    filings,
    error
  }
}

export default connect(mapStateToProps)(InstitutionContainer)*/

export default InstitutionContainer
