import React from 'react'
import PropTypes from 'prop-types'
import InstitutionsHeader from './InstitutionsHeader'
import InstitutionNameAndId from './InstitutionNameAndId'
import InstitutionStatus from './InstitutionStatus'
import InstitutionViewButton from './InstitutionViewButton'
import InstitutionRefile from './InstitutionRefile'
import InstitutionPreviousSubmissions from './InstitutionPreviousSubmissions'

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

Institution.PropTypes = {}

export default Institution
