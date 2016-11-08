import React from 'react'
import { connect } from 'react-redux'
import LoginContainer from './Login.jsx'
import HomeLink from '../components/HomeLink.jsx'

const AppContainer = (props) => {
  console.log(props, props.user)
  let wrapped = props.children
  if(!props.user && props.location.pathname !== '/' && props.location.pathname !== '/oidc-callback') wrapped = <LoginContainer/>
  return (
    <div className="AppContainer usa-grid">
      <HomeLink/><br />
      <img src="/img/ffiec-logo.png" width="150px"/>
      {wrapped}
    </div>
  )
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
