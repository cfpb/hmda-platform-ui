import React, { Component } from 'react'
import { connect } from 'react-redux'
import { receiveAuth } from '../actions'
import Login from '../components/Login.jsx'

function tokenToJWT(token) {
   return OIDC.getIdTokenPayload(token)
}

class LoginContainer extends Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {
    var idToken = OIDC.getValidIdToken();
    var accessToken;

    try {
        accessToken = OIDC.getAccessToken()
    } catch(e) {
        if (e instanceof OidcException) {
            console.log('Could not get access_token.  Error: ' + e.message)
        }
    }
console.log('component stuff', idToken, accessToken)
    if(!idToken || !accessToken) return

    var idJWT = tokenToJWT(idToken)
    var accessJWT = tokenToJWT(accessToken)
    this.props.dispatch(receiveAuth(idJWT, accessJWT))
  }

  render() {
    return <Login {...this.props} />
  }
}

function mapStateToProps(state) {
  const {
    idToken,
    accessToken
  } = state.app.user || {
    idToken: null,
    accessToken: null
  }

  return {
    idToken,
    accessToken
  }
}

export default connect(mapStateToProps)(LoginContainer)
