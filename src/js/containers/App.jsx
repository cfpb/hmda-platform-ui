import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signinRedirect } from '../redirect'
import ConfirmationModal from './ConfirmationModal.jsx'

export class AppContainer extends Component {
  constructor(props) {
      super(props)
  }

  componentWillMount() {
    if(!this.props.user || !this.props.user.profile.name) signinRedirect()
  }

  render() {
    if(!this.props.user || !this.props.user.profile.name){
      if(signinRedirect()) return
    }
    return (
      <div className="AppContainer">
        <a className="usa-skipnav" href="#main-content">Skip to main content</a>
        {this.props.children}

        <footer className="usa-footer usa-footer-slim" role="contentinfo">
          <div className="usa-grid usa-footer-return-to-top">
            <a href="#">Return to top</a>
          </div>
          <div className="usa-footer-primary-section">
            <div className="usa-grid-full">
              <nav className="usa-footer-nav usa-width-one-half">
                <ul className="usa-unstyled-list">
                  <li className="usa-footer-primary-content">
                    <a className="usa-footer-primary-link" href="https://www.ffiec.gov/">FFIEC</a>
                  </li>
                </ul>
              </nav>
              <div className="usa-width-one-half">
                <div className="usa-footer-primary-content usa-footer-contact_info">
                  <h4>Questions?</h4>
                  <a href="mailto:hmdahelp@cfpb.gov">hmdahelp@cfpb.gov</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <ConfirmationModal/>
      </div>
    )
  }
}

export function mapStateToProps(state) {
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
