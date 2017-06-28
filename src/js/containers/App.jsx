import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signinRedirect } from '../utils/redirect'
import ConfirmationModal from './ConfirmationModal.jsx'
import * as AccessToken from '../api/AccessToken.js'
import Header from '../components/Header.jsx'
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

    if(props.oidc.user) AccessToken.set(props.oidc.user.access_token)
    if(isHome) return
    if(!isOidc && props.expired) return signinRedirect()

    if(!props.oidc.user) {
      if(props.oidc.isLoadingUser) return
      if(!isOidc) signinRedirect()
    }
  }

  componentWillMount() {
    this._setOrRedirect(this.props)
  }

  componentWillUpdate(nextProps) {
    this._setOrRedirect(nextProps)
  }

  render() {
    if(!this._isOidc(this.props) && !this._isHome(this.props) && (this.props.expired || !this.props.oidc.user)) return null

    return (
      <div className="AppContainer">
        <a className="usa-skipnav" href="#main-content">Skip to main content</a>
        <Header
          pathname={this.props.location.pathname}
          user={this.props.oidc.user} />
        <ConfirmationModal/>
        {
          this.props.location.pathname === '/oidc-callback' ?
            this.props.children :
            (browser.name === 'ie' && +browser.version.split('.')[0] < 11) ?
              <BrowserBlocker/> :
              this.props.children
        }
        <footer className="usa-footer usa-footer-slim" role="contentinfo">
          <div className="usa-grid usa-footer-return-to-top">
            <a href="#">Return to top</a>
          </div>
          <div className="usa-footer-primary-section">
            <div className="usa-grid-full">
              <nav className="usa-footer-nav usa-width-one-third">
                <ul className="usa-unstyled-list">
                  <li className="usa-footer-primary-content">
                    <a title="FFIEC website" href="https://www.ffiec.gov/"><img src="/img/ffiec-logo.png" width="100px" alt="FFIEC"/></a>
                  </li>
                </ul>
              </nav>
              <div className="usa-width-one-third">
                <h4>Resources</h4>

                <ul className="usa-unstyled-list">
                  <li><a href="https://www.ffiec.gov/hmda/">FFIEC HMDA Website</a></li>
                  <li><a href="https://www.federalregister.gov/documents/2015/10/28/2015-26607/home-mortgage-disclosure-regulation-c">HMDA Final Rule</a></li>
                  <li><a href="https://www.consumerfinance.gov/policy-compliance/guidance/implementation-guidance/hmda-implementation/">Regulatory Implementation Resources</a></li>
                  <li><a href="https://www.consumerfinance.gov/data-research/hmda/for-filers">Resources for HMDA Filers</a></li>
                  <li><a href="mailto:hmdahelp@cfpb.gov">Contact Us</a></li>
                </ul>
              </div>
              <div className="usa-width-one-third">
                <h4>HMDA Platform Tools</h4>

                <ul className="usa-unstyled-list">
                  <li><a href="https://cfpb.github.io/hmda-platform-tools/file-format-verification/">File Format Verification Tool</a></li>
                  {/*<li>Check Digit Generator</li>
                  <li>Rate Spread Calculator</li>*/}
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export function mapStateToProps(state) {
  const { oidc } = state
  const { expired } = state.app.user

  return {
    oidc,
    expired
  }
}

export default connect(mapStateToProps)(AppContainer)
