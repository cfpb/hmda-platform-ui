import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConfirmationModal from './modals/confirmationModal/container.jsx'
import Header from './common/Header.jsx'
import Footer from './common/Footer.jsx'
import BrowserBlocker from './common/BrowserBlocker.jsx'
import Loading from './common/Loading.jsx'
import * as AccessToken from './api/AccessToken.js'
import { getKeycloak, refresh } from './utils/keycloak.js'
import isRedirecting from './actions/isRedirecting.js'
//import { error } from './utils/log.js'
import browser from 'detect-browser'

import 'normalize.css'
import './app.css'

export class AppContainer extends Component {
  componentDidMount() {
    const keycloak = getKeycloak()
    keycloak.init().then(authenticated => {
      if (authenticated) {
        AccessToken.set(keycloak.token)
        refresh()
        if (this.props.redirecting) this.props.dispatch(isRedirecting(false))
        else this.forceUpdate()
      } else {
        if (!this._isHome(this.props))
          keycloak.login(this.props.location.pathname)
      }
    })
  }

  componentDidUpdate(props) {
    const keycloak = getKeycloak()
    if (!keycloak.authenticated && !this._isHome(this.props)) keycloak.login()
  }

  _renderAppContents(props) {
    if (this._isOldBrowser()) return <BrowserBlocker />
    if (
      props.redirecting ||
      (!getKeycloak().authenticated && !this._isHome(props))
    )
      return <Loading className="floatingIcon" />
    return props.children
  }

  _isOldBrowser() {
    return browser.name === 'ie' && +browser.version.split('.')[0] < 11
  }

  _isHome(props) {
    return !!props.location.pathname.match(/^\/filing\/^SW[0-9]{4}\/$/)
  }

  render() {
    return (
      <div className="AppContainer">
        <a className="skipnav" href="#main-content">
          Skip to main content
        </a>
        <Header pathname={this.props.location.pathname} />
        <ConfirmationModal />
        {this._renderAppContents(this.props)}
        <Footer />
      </div>
    )
  }
}

export function mapStateToProps(state) {
  const { redirecting } = state.app

  return {
    redirecting
  }
}

export default connect(mapStateToProps)(AppContainer)
