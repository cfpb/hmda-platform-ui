import React from 'react'

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
                  href={window.HMDA_ENV.HOMEPAGE_URL}
                  title="Home"
                  aria-label="Home"
                >
                  <img src="/filing/img/ffiec-logo.svg" height="21px" alt="FFIEC" />
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
