import React from 'react'

import './Footer.css'
import logo from '../images/ffiec-logo.svg'
import { getKeycloak } from '../utils/keycloak.js'

export const getLink = props => {
  var year = window.location.pathname.substring(8,12)
  if (getKeycloak().authenticated) return '/filing/'+year+'/institutions'
  return '/filing/'+year+'/'
}

const Footer = () => {
  return (
    <footer className="Footer footer footer-slim" role="contentinfo">
      <div className="usa-grid-full">
        <button className="return-to-top button-link" onClick={e => {
          e.preventDefault()
          window.scrollTo(0,0)
        }}>
          Return to top
        </button>
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
