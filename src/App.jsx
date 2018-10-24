import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConfirmationModal from './modals/confirmationModal/container.jsx'
import Header from './common/Header.jsx'
import Footer from './common/Footer.jsx'
import BrowserBlocker from './common/BrowserBlocker.jsx'
import Loading from './common/Loading.jsx'
//import { error } from './utils/log.js'
import browser from 'detect-browser'

import './app.css'

export class AppContainer extends Component {
  _renderAppContents(props) {
    if (this._isOldBrowser()) return <BrowserBlocker />
    if (props.redirecting) return <Loading className="floatingIcon" />
    return props.children
  }

  _isOldBrowser() {
    return browser.name === 'ie' && +browser.version.split('.')[0] < 11
  }

  _isHome(props) {
    return props.location.pathname === '/filing'
  }

  render() {
    return (
      <div className="AppContainer">
        <a className="skipnav" href="#main-content">
          Skip to main content
        </a>
        <Header pathname={this.props.location.pathname} />
        {!this.props.redirecting ? null : <ConfirmationModal />}
        {this._renderAppContents(this.props)}
        <Footer />
      </div>
    )
  }
}

export function mapStateToProps(state) {
  const { redirecting } = state.app
  //const { oidc, isFetching, userError } = state.app.user

  return {
    //oidc,
    //isFetching,
    //userError,
    redirecting
  }
}

export default connect(mapStateToProps)(AppContainer)
