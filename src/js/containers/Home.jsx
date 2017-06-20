import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import HomeComponent from '../components/Home.jsx'
import InstitutionsContainer from '../containers/Institutions.jsx'

export class HomeContainer extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    if(this.props.user === null) return <HomeComponent {...this.props} />
    return <InstitutionsContainer />
  }
}

export function mapStateToProps(state) {
  return {
    user: state.oidc.user,
    filingPeriod: state.app.filingPeriod
  }
}

export default connect(mapStateToProps)(HomeContainer)
