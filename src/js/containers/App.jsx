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
    console.log('App mounting', this.props.user)
    if(!this.props.user) signinRedirect()
  }

  render() {
    return (
      <div className="AppContainer">
        <div className="bg-color-hmda-gray padding-1">
          <div className="usa-grid">
            <img src="/img/ffiec-logo.png" width="150px"/><br />
            <HomeLink/>
          </div>
        </div>
        <div className="usa-grid">
          {this.props.children}
        </div>
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
