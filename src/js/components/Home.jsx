import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const renderLoggedInHero = () => {
  return (
    <div className="usa-width-one-whole">
      <h1>Thanks for logging in!</h1>
      <p className="usa-font-lead">The place to get started is the institutions page. This page provides a summary of institutions for which you are authorized to file HMDA data, along with the current filing status, access to previous submission data (CSV), and the ability to continue filing or start over.</p>
      <Link to={'/institutions'} className="usa-button">View Your Institutions</Link>
    </div>
  )
}

const renderLoggedOutHero = () => {
  return (
    <div className="usa-width-one-whole">
      <h1>Get started filing your HMDA data</h1>
      <p className="usa-font-lead">Beginning with HMDA data collected in or after 2017, financial institutions will use the HMDA Platform to upload their loan/application registers (LARs), review edits, certify the accuracy and completeness of the data, and submit data for the filing year.</p>
      <Link to={'/institutions'} className="usa-button">Get Started Filing</Link>
      <p className="usa-text-small">Every user is required to register online for login credentials and establish an account prior to accessing the HMDA Platform.</p>
    </div>
  )
}

const Home = (props) => {
  const renderHero = (props.user && props.user.profile.name) ? renderLoggedInHero() : renderLoggedOutHero()

  return (
    <div>
      <main className="Home" id="main-content">
        <section className="usa-hero">
          <div className="usa-grid">
            {renderHero}
          </div>
        </section>
        <div className="usa-grid">
          <div className="usa-width-one-whole">
            <article className="faqs">
              <h2>Top FAQs</h2>
              <dl>
                <dt>What is the deadline for submitting my HMDA data?</dt>
                <dd>The deadline for submitting HMDA data is March 1 following the calendar year for which data are collected and recorded. For example, for data collected in 2017, the deadline for submitting HMDA data is March 1, 2018.</dd>
                <dt>Can my financial institution have multiple user accounts?</dt>
                <dd>Each financial institution may have multiple users. Also, a user may be authorized by more than one financial institution to file HMDA data on those institutions’ behalf, provided that under Regulation C, each such institution is a HMDA filer.</dd>
                <dt>Will I be able to manually enter my LAR into the HMDA Platform?</dt>
                <dd>The HMDA Platform only accepts a pipe delimited text file containing your LAR. Any modifications to the data must be updated in the file and uploaded to the HMDA Platform. This must be a single file as the HMDA Platform will not allow users to combine multiple files.</dd>
                <dt>Is there another tool for me to confirm that my LAR is in the correct format?</dt>
                <dd>Filers who wish to confirm that their LAR is formatted in the required pipe delimited text file format may use the <a href="https://github.com/cfpb/hmda-platform-tools">File Format Verification Tool</a>. This tool will conduct the same initial checks that the HMDA Platform performs, and provides a convenient test mechanism for filers.</dd>
              </dl>
            </article>
          </div>
        </div>

        <div className="usa-grid">
          <hr />
          <div className="usa-width-one-whole">
            <h3>Paperwork Reduction Act</h3>
            <p className="usa-text-small">According to the Paperwork Reduction Act of 1995, an agency may not conduct or sponsor, and, not withstanding any other provision of law, a person is not required to respond to a collection of information unless it displays a valid OMB control number. The OMB control number for this collection is 3170-0008. The time required to complete this information collection is estimated to average between 7,700 hours and 77 hours per response depending on the size of the institution, per response. The obligation to respond to this collection of information is mandatory per the Home Mortgage Disclosure Act 12 U.S.C. 2801-2810 as implemented by CFPB’S Regulation C 12 CFR part 1003. Comments regarding this collection of information, including the estimated response time, suggestions for improving the usefulness of the information, or suggestions for reducing the burden to respond to this collection should be submitted to the Bureau at the Consumer Financial Protection Bureau (Attention: PRA Office), 1700 G Street NW, Washington, DC 20552, or by email to PRA@cfpb.gov. The other agencies collecting information under this regulation maintain OMB Control numbers for their collections as follows: Office of the Comptroller of the Currency (1557–0159), the Federal Deposit Insurance Corporation (3064–0046), the Federal Reserve System (7100–0247), the Department of Housing and Urban Development (HUD) (2502–0529), the National Credit Union Administration (3133–0166).</p>
          </div>
        </div>
      </main>
    </div>
  )
}

Home.propTypes = {
  // from /containers/Home.jsx
  user: PropTypes.object,
  filingPeriod: PropTypes.string,
  // there are more props available but they are not used
}

export default Home
