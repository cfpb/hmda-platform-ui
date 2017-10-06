import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signinRedirect } from '../utils/redirect'
import ConfirmationModal from './ConfirmationModal.jsx'
import LoggedOutModal from '../components/LoggedOutModal.jsx'
import * as AccessToken from '../api/AccessToken.js'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import BrowserBlocker from '../components/BrowserBlocker.jsx'
import browser from 'detect-browser'

export class AppContainer extends Component {
  constructor(props) {
    super(props)
  }

  _isHome(props) {
    return props.location.pathname === '/'
  }

  _isOidc(props) {
    return props.location.pathname === '/oidc-callback'
  }

  _setOrRedirect(props) {
    const isHome = this._isHome(props)
    const isOidc = this._isOidc(props)

    if (props.oidc.user) AccessToken.set(props.oidc.user.access_token)
    if (isHome) return

    if (!isOidc && props.expired) return signinRedirect()

    if (!props.oidc.user) {
      if (props.oidc.isLoadingUser) return
      if (!isOidc) signinRedirect()
    }
  }

  componentWillMount() {
    this._setOrRedirect(this.props)
  }

  componentWillUpdate(nextProps) {
    this._setOrRedirect(nextProps)
  }

  render() {
    if (
      !this._isOidc(this.props) &&
      !this._isHome(this.props) &&
      (this.props.expired || !this.props.oidc.user)
    )
      return null

    return (
      <div className="AppContainer">
        <a className="usa-skipnav" href="#main-content">
          Skip to main content
        </a>
        <Header
          pathname={this.props.location.pathname}
          user={this.props.oidc.user}
        />
        {this.props.userError ? <LoggedOutModal /> : <ConfirmationModal />}
        {this.props.location.pathname === '/oidc-callback' ? (
          this.props.children
        ) : browser.name === 'ie' && +browser.version.split('.')[0] < 11 ? (
          <BrowserBlocker />
        ) : (
          this.props.children
        )}
        <Footer />
      </div>
    )
  }
}

export function mapStateToProps(state) {
  const { oidc } = state
  const { expired, userError } = state.app.user

  return {
    oidc,
    expired,
    userError
  }
}

export default connect(mapStateToProps)(AppContainer)
