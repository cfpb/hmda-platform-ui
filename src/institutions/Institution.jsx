import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../common/Alert.jsx'
import InstitutionNameAndId from './NameAndId.jsx'
import InstitutionStatus from './Status.jsx'
import InstitutionViewButton from './ViewButton.jsx'
import InstitutionRefile from './Refile.jsx'
import InstitutionSubmissionHistory from './SubmissionHistory.jsx'
import SubmissionNav from './Progress.jsx'

const Institution = ({
  institution,
  filing,
  filingPeriod,
  submission,
  submissions
}) => {
  const status = submission && submission.status

  return (
    <div className="usa-grid-full">
      {filing ? (
        <section className="institution">
          <div className="current-status">
            <InstitutionNameAndId name={institution.name} id={institution.id} />

            <SubmissionNav status={status} />

            <InstitutionStatus filing={filing} submission={submission} />

            <InstitutionViewButton
              status={status}
              institutionId={institution.id}
              filingPeriod={filing.period}
            />

            <InstitutionRefile institution={institution} status={status} />
          </div>
          <InstitutionSubmissionHistory
            submissions={submissions}
            institutionId={institution.id}
          />
        </section>
      ) : (
        // this error is rendered here so we can
        // give the user the FI name and id
        <section className="institution">
          <div className="current-status">
            <InstitutionNameAndId name={institution.name} id={institution.id} />
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
          </div>
        </section>
      )}
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
