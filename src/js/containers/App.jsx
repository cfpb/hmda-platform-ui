import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import LoginContainer from './Login.jsx'
import HomeLink from '../components/HomeLink.jsx'
import { signinRedirect } from '../redirect'

class AppContainer extends Component {
  constructor(props) {
      super(props)
  }

  componentWillMount() {
    if(!this.props.user) signinRedirect()
  }

  render() {
    return (
      <div className="AppContainer usa-grid">
        <HomeLink/><br />
        <img src="/img/ffiec-logo.png" width="150px"/>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    user
  } = state.oidc || {
    user: null
  }

  return {
    user
  }
}

export default connect(mapStateToProps)(AppContainer)
