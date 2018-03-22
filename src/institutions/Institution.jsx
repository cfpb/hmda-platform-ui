import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../common/Alert.jsx'
import InstitutionNameAndId from './NameAndId.jsx'
import InstitutionStatus from './Status.jsx'
import InstitutionViewButton from './ViewButton.jsx'
import InstitutionRefile from './Refile.jsx'
import InstitutionSubmissionHistory from './SubmissionHistory.jsx'
import SubmissionNav from './Progress.jsx'
import { afterFilingPeriod } from '../utils/date.js'

const Institution = ({
  institution,
  filing,
  filingPeriod,
  submission,
  submissions
}) => {
  const status = submission && submission.status
  let className = 'institution'
  if (afterFilingPeriod(filingPeriod)) className += ' closedFilingPeriod'

  return (
    <div className="usa-grid-full">
      <section className={className}>
        <div className="current-status">
          <InstitutionNameAndId name={institution.name} id={institution.id} />
          {filing ? (
            <React.Fragment>
              <SubmissionNav status={status} />

              <InstitutionStatus filing={filing} submission={submission} />

              <InstitutionViewButton
                status={status}
                institutionId={institution.id}
                filingPeriod={filing.period}
              />

              <InstitutionRefile institution={institution} status={status} />
            </React.Fragment>
          ) : (
            <Alert
              type="warning"
              heading={`No filing initialized for ${filingPeriod}.`}
            >
              <p>
                Your filing has not been initialized for filing period{' '}
                {filingPeriod}. If you need to submit data for this filing
                period, please contact{' '}
                <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.
              </p>
            </Alert>
          )}
        </div>
        {filing ? (
          <InstitutionSubmissionHistory
            submissions={submissions}
            institutionId={institution.id}
          />
        ) : null}
      </section>
    </div>
  )
}

Institution.propTypes = {
  institution: PropTypes.object,
  filing: PropTypes.object,
  submission: PropTypes.object,
  submissions: PropTypes.array
}

export default Institution
