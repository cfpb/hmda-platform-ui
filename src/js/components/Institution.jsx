import React from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'
import InstitutionNameAndId from './InstitutionNameAndId.jsx'
import InstitutionStatus from './InstitutionStatus.jsx'
import InstitutionViewButton from './InstitutionViewButton.jsx'
import InstitutionRefile from './InstitutionRefile.jsx'
import InstitutionPreviousSubmissions from './InstitutionPreviousSubmissions.jsx'

const Institution = ({
  institution,
  filing,
  submission,
  submissions,
  onDownloadClick
}) => {
  if (!filing)
    return (
      <div className="usa-grid-full">
        <section className="institution">
          <div className="current-status">
            <InstitutionNameAndId name={institution.name} id={institution.id} />
            <Alert type="error">
              <p>
                There was a problem initializing your filing. Please contact{' '}
                <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.
              </p>
            </Alert>
          </div>
        </section>
      </div>
    )

  const status = submission && submission.status

  return (
    <div className="usa-grid-full">
      <section className="institution">
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

          <InstitutionRefile status={status} filing={filing} />
        </div>

        <InstitutionPreviousSubmissions
          submissions={submissions}
          institutionId={institution.id}
          filingPeriod={filing.period}
          onDownloadClick={onDownloadClick}
        />
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
