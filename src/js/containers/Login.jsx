import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { redirectAuth, processAuth } from '../actions'
import { UserManager, Log, WebStorageStateStore } from 'oidc-client'
import Login from '../components/Login.jsx'

Log.logger = console

let manager

class LoginContainer extends Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {
    manager = new UserManager({
      authority: 'https://192.168.99.100:8443/auth/realms/hmda',
      client_id: 'hmda-api',
      redirect_uri: 'http://192.168.99.100',
      scope: 'openid profile email',
      response_type: 'id_token token'
    })
    window.manager = manager
    this.props.getAuthTokens()
  }

  render() {
    return <Login {...this.props} />
  }
}

function mapStateToProps(state) {
  const {
    user
  } = state.app.auth || {
    user: null
  }

  return {
    user
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    redirect(){
      dispatch(redirectAuth(manager))
    },
    getAuthTokens() {
      console.log('ownProps.router', ownProps.router)
      dispatch(processAuth(manager, ownProps.router))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer))
