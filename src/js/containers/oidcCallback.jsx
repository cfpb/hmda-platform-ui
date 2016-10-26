import React from 'react'
import { CallbackComponent } from 'redux-oidc'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

class oidcCallback extends React.Component {

  successCallback(user) {
    console.log('success from oidccb', user)
    // the user object gets the browser's URL before
    // redirection was triggered passed into its state
    // when triggerAuthFlow is set to `true`
    this.props.dispatch(push('/institutions'))
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
