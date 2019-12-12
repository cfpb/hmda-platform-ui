import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from './index.jsx'
import InstitutionsContainer from '../institutions/container.jsx'

export class HomeContainer extends Component {
  render() {
    if (this.props.user === null) return (
      <Home
        pathname={this.props.location.pathname}
        filingPeriod={this.props.params.filingPeriod}
        config={this.props.config}
      />
    )
    return <InstitutionsContainer />
  }
}

export function mapStateToProps(state) {
  return {
    user: state.app.user.oidc,
    config: state.app.config
  }
}

export default connect(mapStateToProps)(HomeContainer)
