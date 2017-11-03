import React from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'
import InstitutionNameAndId from './InstitutionNameAndId.jsx'
import InstitutionStatus from './InstitutionStatus.jsx'
import InstitutionViewButton from './InstitutionViewButton.jsx'
import InstitutionRefile from './InstitutionRefile.jsx'
import InstitutionSubmissionHistory from './InstitutionSubmissionHistory.jsx'

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
      <section className="institution">
        {/*
        a filing should be created when an institution is created
        so this shouldn't happen but just in case ...
        render an alert if we don't have filings for an institution
        otherwise show the current status
        */}
        {!filing ? (
          <div className="current-status">
            <InstitutionNameAndId name={institution.name} id={institution.id} />
            <Alert type="error">
              <p>
                There was a problem initializing your filing. Please contact{' '}
                <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.
              </p>
            </Alert>
          </div>
        ) : (
          <div className="current-status">
            <InstitutionNameAndId name={institution.name} id={institution.id} />

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
        )}
        {/* we can only show history if there is a filing */}
        {filing ? (
          <InstitutionSubmissionHistory
            submissions={submissions}
            institutionId={institution.id}
            filingPeriod={filing.period}
            onDownloadClick={onDownloadClick}
          />
        ) : null}
      </section>
    </div>
  )
}

Institution.PropTypes = {
  institution: PropTypes.object,
  filing: PropTypes.object,
  submission: PropTypes.object,
  submissions: PropTypes.object,
  onDownloadClick: PropTypes.func
}

export default Institution
