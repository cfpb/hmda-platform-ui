import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from './index.jsx'
import updateFilingPeriod from '../actions/updateFilingPeriod.js'
import InstitutionsContainer from '../institutions/container.jsx'

export class HomeContainer extends Component {
  componentDidMount() {
    this.props.dispatch(updateFilingPeriod(this.props.params.filingPeriod))
  }

  render() {
    if (this.props.user === null) return <Home filingPeriod={this.props.params.filingPeriod}/>
    return <InstitutionsContainer />
  }
}

export function mapStateToProps(state) {
  return {
    user: state.app.user.oidc
  }
}

export default connect(mapStateToProps)(HomeContainer)
