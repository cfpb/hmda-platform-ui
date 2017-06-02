import React from 'react'
import { CallbackComponent } from 'redux-oidc'
import { connect } from 'react-redux'
import { set } from '../api/AccessToken.js'
import { restorePage } from '../utils/redirect'

export class oidcCallback extends React.Component {

  successCallback(user) {
    set(user.access_token)
    restorePage()
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
