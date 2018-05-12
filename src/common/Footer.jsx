import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <footer className="Footer usa-footer usa-footer-slim" role="contentinfo">
      <div className="usa-grid usa-footer-return-to-top">
        <a href="#">Return to top</a>
      </div>
      <div className="usa-footer-primary-section">
        <div className="usa-grid-full">
          <nav className="usa-footer-nav usa-width-one-third">
            <ul className="usa-unstyled-list">
              <li className="usa-footer-primary-content">
                <Link
                  className="usa-nav-link"
                  to={window.HMDA_ENV.FILING_APP_URL}
                  title="Home"
                  aria-label="Home"
                >
                  <img
                    src="/filing/img/ffiec-logo.png"
                    width="75px"
                    alt="FFIEC"
                  />
                  HMDA Platform
                </Link>
              </li>
            </ul>
          </nav>
          <div className="usa-width-one-third">
            <h4>Resources</h4>

            <ul className="usa-unstyled-list">
              <li>
                <a href="https://www.ffiec.gov/hmda/">FFIEC HMDA Website</a>
              </li>
              <li>
                <a href="https://www.federalregister.gov/documents/2015/10/28/2015-26607/home-mortgage-disclosure-regulation-c">
                  HMDA Final Rule
                </a>
              </li>
              <li>
                <a href="https://www.consumerfinance.gov/policy-compliance/guidance/implementation-guidance/hmda-implementation/">
                  Regulatory Implementation Resources
                </a>
              </li>
              <li>
                <a href="https://www.consumerfinance.gov/data-research/hmda/for-filers">
                  Resources for HMDA Filers
                </a>
              </li>
              <li>
                <a href="mailto:hmdahelp@cfpb.gov">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="usa-width-one-third">
            <h4>HMDA Platform Tools</h4>

            <ul className="usa-unstyled-list">
              <li>
                <a href="https://ffiec.cfpb.gov/tools/file-format-verification/">
                  File Format Verification Tool
                </a>
              </li>
              <li>
                <a href="https://ffiec.cfpb.gov/tools/check-digit/">
                  Check Digit Tool
                </a>
              </li>
              <li>
                <a href="https://ffiec.cfpb.gov/tools/rate-spread/">
                  Rate Spread Calculator
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
