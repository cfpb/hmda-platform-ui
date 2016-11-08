import React from 'react'
import { CallbackComponent } from 'redux-oidc'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { setAccessToken } from '../api'

class oidcCallback extends React.Component {

  successCallback(user) {
    console.log('success from oidccb', user)
    setAccessToken(user.access_token)
    browserHistory.push('/institutions')
  }

  render() {
    return <CallbackComponent successCallback={this.successCallback.bind(this)} />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(null, mapDispatchToProps)(oidcCallback)
