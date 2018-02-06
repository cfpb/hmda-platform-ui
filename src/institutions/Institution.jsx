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
  submission,
  submissions,
  onDownloadClick
}) => {
  const status = submission && submission.status

  return (
    <div className="usa-grid-full">
      {/*
        a filing should be created when an institution is created
        so this shouldn't happen but just in case ...
        render the current status if there is a filing
        otherwise render an alert
      */}
      {filing ? (
        <section className="institution">
          <div className="current-status">
            <InstitutionNameAndId name={institution.name} id={institution.id} />

            <SubmissionNav status={status} />

            <InstitutionStatus
              institutionId={institution.id}
              filing={filing}
              submission={submission}
              onDownloadClick={onDownloadClick}
            />

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
            filingPeriod={filing.period}
            onDownloadClick={onDownloadClick}
          />
        </section>
      ) : (
        <section className="institution">
          <div className="current-status">
            <InstitutionNameAndId name={institution.name} id={institution.id} />
            <Alert type="error" heading="Sorry, there was a problem.">
              <p>
                There was a problem initializing your filing. Please contact{' '}
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
  submissions: PropTypes.array,
  onDownloadClick: PropTypes.func
}

export default Institution
