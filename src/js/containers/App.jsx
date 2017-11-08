import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserManager, signinRedirect } from '../utils/redirect'
import ConfirmationModal from './ConfirmationModal.jsx'
import LoggedOutModal from './LoggedOutModal.jsx'
import * as AccessToken from '../api/AccessToken.js'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import BrowserBlocker from '../components/BrowserBlocker.jsx'
import LoadingIcon from '../components/LoadingIcon.jsx'
import makeAction from '../actions/makeAction.js'
import { error } from '../utils/log.js'
import { USER_LOADING, USER_EXPIRED, USER_FOUND } from '../constants'
import browser from 'detect-browser'

export class AppContainer extends Component {
  constructor(props) {
    super(props)
  }

  _renderAppContents(props, redirecting) {
    if (this.props.location.pathname === '/oidc-callback')
      return this.props.children
    if (this._isOldBrowser()) return <BrowserBlocker />
    if (props.redirecting || this._isProtected(props))
      return <LoadingIcon className="floatingIcon" />
    return this.props.children
  }

  _isOldBrowser() {
    return browser.name === 'ie' && +browser.version.split('.')[0] < 11
  }

  _isHome(props) {
    return props.location.pathname === '/'
  }

  _isOidc(props) {
    return props.location.pathname === '/oidc-callback'
  }

  _isProtected(props) {
    return (
      !this._isOidc(this.props) && !this._isHome(this.props) && !this.props.oidc
    )
  }

  _handleUser(user) {
    if (!user || user.expired) this.props.dispatch(makeAction(USER_EXPIRED))
    else {
      AccessToken.set(user.access_token)
      this.props.dispatch(makeAction(USER_FOUND, user))
    }
  }

  _userError(err) {
    error('Error loading user.', err)
  }

  componentWillMount() {
    if (!this.props.oidc || this.props.oidc.expired) {
      this.props.dispatch(makeAction(USER_LOADING))
      getUserManager()
        .getUser()
        .then(this._handleUser.bind(this))
        .catch(this._userError)
    } else {
      AccessToken.set(this.props.user.oidc.access_token)
    }
  }

  componentWillUpdate(props) {
    const isHome = this._isHome(props)
    const isOidc = this._isOidc(props)

    if (isHome) return
    if (!props.oidc) {
      if (props.isFetching) return
      if (!isOidc) signinRedirect()
    }
  }

  render() {
    return (
      <div className="AppContainer">
        <a className="usa-skipnav" href="#main-content">
          Skip to main content
        </a>
        <Header
          pathname={this.props.location.pathname}
          user={this.props.oidc}
        />
        {this.props.userError ? <LoggedOutModal /> : <ConfirmationModal />}
        {this._renderAppContents(this.props)}
        <Footer />
      </div>
    )
  }
}

export function mapStateToProps(state) {
  const { redirecting } = state.app
  const { oidc, isFetching, userError } = state.app.user

  return {
    oidc,
    isFetching,
    userError,
    redirecting
  }
}

export function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect(mapStateToProps)(AppContainer)
