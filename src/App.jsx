import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserManager, signinRedirect } from './utils/redirect.js'
import ConfirmationModal from './modals/confirmationModal/container.jsx'
import LoggedOutModal from './modals/loggedOutModal/container.jsx'
import * as AccessToken from './api/AccessToken.js'
import Header from './common/Header.jsx'
import Footer from './common/Footer.jsx'
import BrowserBlocker from './common/BrowserBlocker.jsx'
import Loading from './common/Loading.jsx'
import makeAction from './actions/makeAction.js'
import { error } from './utils/log.js'
import { USER_LOADING, USER_EXPIRED, USER_FOUND } from './constants'
import browser from 'detect-browser'

export class AppContainer extends Component {
  _renderAppContents(props) {
    if (this._isOldBrowser()) return <BrowserBlocker />
    if (props.redirecting || (!props.oidc && !this._isUnprotected(props)))
      return <Loading className="floatingIcon" />
    return props.children
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

  _isUnprotected(props) {
    return this._isOidc(props) || this._isHome(props)
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
      AccessToken.set(this.props.oidc.access_token)
    }
  }

  componentWillUpdate(props) {
    if (props.oidc || props.isFetching) return

    if (this._isUnprotected(props)) return

    signinRedirect()
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
