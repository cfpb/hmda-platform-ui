import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { redirectAuth, processAuth } from '../actions'
import Login from '../components/Login.jsx'
import userManager from '../UserManager.js'


class LoginContainer extends Component {
  constructor(props) {
      super(props)
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
      userManager.signinRedirect()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
