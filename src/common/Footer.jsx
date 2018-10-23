import React from 'react'

import './Footer.css'
import logo from '../images/ffiec-logo.svg'

const Footer = () => {
  return (
    <footer className="Footer usa-footer usa-footer-slim" role="contentinfo">
      <div className="usa-grid usa-footer-return-to-top">
        <a href="#">Return to top</a>
      </div>
      <div className="usa-footer-primary-section">
        <div className="usa-grid-full">
          <nav className="usa-footer-nav usa-width-one-half">
            <ul className="usa-unstyled-list">
              <li className="usa-footer-primary-content">
                <a
                  className="usa-nav-link"
                  href="/filing"
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
