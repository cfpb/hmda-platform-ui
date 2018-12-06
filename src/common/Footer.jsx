import React from 'react'

import './Footer.css'
import logo from '../images/ffiec-logo.svg'
import { getKeycloak } from '../utils/keycloak.js'

export const getLink = () => {
  if (getKeycloak().authenticated) return '/filing/2018/institutions'
  return '/filing/2018/'
}

const Footer = () => {
  return (
    <footer className="Footer footer footer-slim" role="contentinfo">
      <div className="usa-grid-full">
        <a className="return-to-top" href="#">
          Return to top
        </a>
      </div>
      <div className="footer-primary-section">
        <div className="usa-grid-full">
          <nav className="usa-width-one-half footer-nav">
            <ul className="unstyled-list">
              <li className="footer-primary-content">
                <a
                  className="nav-link"
                  href={getLink()}
                  title="Home"
                  aria-label="Home"
                >
                  <img src={logo} height="21px" alt="FFIEC" />
                  Home Mortgage Disclosure Act
                </a>
              </li>
            </ul>
          </nav>
          <div className="usa-width-one-half">
            <a href="mailto:hmdahelp@cfpb.gov">Questions?</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
