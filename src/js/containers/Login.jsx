import React, { Component } from 'react'
import { connect } from 'react-redux'
import { forwardToAuth, processAuth } from '../actions'
import { UserManager } from 'oidc-client'
import Login from '../components/Login.jsx'

class LoginContainer extends Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {
    if(this.props.manager){
      this.props.getAuthTokens(this.props.manager)
    }
  }

  render() {
    return <Login {...this.props} />
  }
}

function mapStateToProps(state) {
  const {
    user,
    manager
  } = state.app.user || {
    user: null,
    manager: null
  }

  return {
    user,
    manager
  }
}

function mapDispatchToProps(dispatch) {
  return {
    forward() {
      dispatch(forwardToAuth(new UserManager({
        authority: 'https://192.168.99.100:8443/auth/realms/hmda',
        client_id: 'hmda-api',
        redirect_uri: 'http://192.168.99.100/institutions',
        scope: 'openid profile email',
        response_type: 'id_token token'
      })))
    },
    getAuthTokens(manager) {
      dispatch(processAuth(manager))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
