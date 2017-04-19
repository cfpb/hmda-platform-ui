import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import HomeComponent from '../components/Home.jsx'

export class HomeContainer extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return <HomeComponent {...this.props} />
  }
}

export function mapStateToProps(state) {
  return {
    user: state.oidc.user || { profile: { name: null } },
    filingPeriod: state.app.filingPeriod
  }
}

export default connect(mapStateToProps)(HomeContainer)
