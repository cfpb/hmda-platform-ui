import React from 'react'
import Header from '../components/Header.jsx'
import { Link } from 'react-router'
import { signinRedirect } from '../redirect.js'

const getLoginMessage = (userName) => {
  if(userName) return null

  return (
    <div className="usa-alert usa-alert-error" role="alert">
      <div className="usa-alert-body">
        <h3 className="usa-alert-heading">The filing period has started.</h3>
        <p className="usa-alert-text">Starting on January 1 and ending March 1 you can submit LAR file. <a href="#" onClick={(e) => {
          e.preventDefault()
          signinRedirect(true)
        }}>Login</a> to get started.</p>
      </div>
    </div>
  )
}

const Home = (props) => {
  return (
    <div>
      <Header
        pathname={props.location.pathname}
        userName={props.user.profile.name} />
      <div className="Home" id="main-content">
        <div className="usa-grid">
          <div className="usa-width-one-whole">
            <h2>Welcome to HMDA Filing{props.user.profile.name ? ' ' + props.user.profile.name : ''}</h2>

            {getLoginMessage(props.user.profile.name)}

            <div className="usa-alert usa-alert-info" role="alert">
              <div className="usa-alert-body">
                <h3 className="usa-alert-heading">Modified LAR files have been published.</h3>
                <p className="usa-alert-text">You can now <a href="#">search for and view</a> the modified LAR files.</p>
              </div>
            </div>

            <hr />
          </div>
        </div>

        <div className="usa-grid">
          <div className="usa-width-one-half">
            <p className="usa-font-lead">Beginning with HMDA data collected in or after 2017, financial institutions will use the HMDA Platform to upload their loan/application registers (LARs), review edits, certify the accuracy and completeness of the data, and submit data for the filing year.</p>
            <h3>How to get started</h3>
            <p>Select the Login button to begin the process for filing your HMDA data. The HMDA Platform will require every HMDA filer to register online for login credentials and establish an account prior to using the system.</p>
            <p>Once you have logged in, you may upload your financial institution’s LAR. The HMDA Platform will then guide you through the filing process.</p>
            <p>For resources to help you prepare your HMDA filing, please visit <a href="http://www.consumerfinance.gov/data-research/hmda/for-filers">Resources for HMDA filers</a>.</p>
          </div>
          <div className="usa-width-one-half">
            <h3>Top FAQs</h3>
            <dl>
              <dt>What type of browser do I need in order to use the CFPB’s HMDA Platform?</dt>
              <dd>We recommend that HMDA filers use a modern browser, such as the latest version of Google Chrome or Mozilla Firefox, Internet Explorer 11, Microsoft Edge, or other modern browsers.</dd>
              <dt>What is the deadline for submitting my HMDA data?</dt>
              <dd>The deadline for submitting HMDA data is March 1 following the calendar year for which data are collected and recorded. For example, for data collected in 2017, the deadline for submitting HMDA data is March 1, 2018.</dd>
              <dt>Can my financial institution have multiple user accounts?</dt>
              <dd>Each financial institution may have multiple users. Also, a user may be authorized by more than one financial institution to file HMDA data on those institutions’ behalf, provided that under Regulation C, each such institution is a HMDA filer.</dd>
              <dt>Will I be able to manually enter my LAR into the HMDA Platform?</dt>
              <dd>The HMDA Platform only accepts a pipe delimited text file containing your LAR. Any modifications to the data must be updated in the file and uploaded to the HMDA Platform. This must be a single file as the HMDA Platform will not allow users to combine multiple files.</dd>
              <dt>Is there another tool for me to confirm that my LAR is in the correct format?</dt>
              <dd>Filers who wish to confirm that their LAR is formatted in the required pipe delimited text file format may use the <a href="https://github.com/cfpb/hmda-platform-tools">File Format Verification Tool</a>. This tool will conduct the same initial checks that the HMDA Platform performs, and provides a convenient test mechanism for filers.</dd>
            </dl>
          </div>
        </div>

        <div className="usa-grid">
          <hr />
          <div className="usa-width-one-third">
            <h4>1003 Regulation C</h4>
            <ul className="usa-unstyled-list">
              <li><a href="http://www.consumerfinance.gov/eregulations/1003">Home Mortgage Disclosure</a></li>
            </ul>
          </div>

          <div className="usa-width-one-third">
            <h4>Tools</h4>
            <ul className="usa-unstyled-list">
              <li><a href="https://github.com/cfpb/hmda-platform-tools">File Format Verification Tool</a></li>
            </ul>
          </div>

          <div className="usa-width-one-third">
            <h4>FFIEC</h4>
            <ul className="usa-unstyled-list">
              <li><a href="https://www.ffiec.gov/hmda/">HMDA</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

Home.defaultProps = {
  user: {profile: {name: null}}
}

export default Home
