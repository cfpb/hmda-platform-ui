import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
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

function mapDispatchToProps(dispatch) {
  return {
    redirect() {
      userManager.signinRedirect()
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(LoginContainer))
