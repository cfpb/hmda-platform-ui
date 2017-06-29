import React from 'react'
import { CallbackComponent } from 'redux-oidc'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { set } from '../api/AccessToken.js'
import { restorePage } from '../utils/redirect'

export class oidcCallback extends React.Component {

  successCallback(user) {
    set(user.access_token)
    restorePage()
  }

  componentWillMount() {
    if(!this.props.location.hash) browserHistory.replace('/')
  }

  render() {
    if(!this.props.location.hash) return null
    return <CallbackComponent successCallback={this.successCallback.bind(this)} />
  }
}

export default connect()(oidcCallback)
