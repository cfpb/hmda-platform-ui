import React from 'react'
import PropTypes from 'prop-types'
import * as STATUS from '../constants/statusCodes.js'

const defaultSubmission = {
  status: {
    code: STATUS.CREATED,
    message: 'No data has been uploaded yet.',
    description:
      'The filing period is open and available to accept HMDA data. Make sure your data is in a pipe-delimited text file.'
  }
}

const InstitutionStatus = ({
  submission = defaultSubmission,
  filing,
  institutionId,
  onDownloadClick
}) => {
  const { code, message, description } = submission.status

  return (
    <section className="status">
      <h4>{message}</h4>
      <p>{description}</p>
      {filing.status.code === 3 && code !== STATUS.SIGNED ? (
        <p className="usa-text-small">
          You have previously submitted a HMDA file and are in the process of
          refiling. If you do not complete your current refiling process, your
          original submission will be accepted for the current filing period.
        </p>
      ) : null}
      {code > STATUS.VALIDATING ? (
        <p className="usa-text-small">
          <a
            href="#"
            onClick={e => {
              e.preventDefault()
              onDownloadClick(
                institutionId,
                filing.period,
                submission.id.sequenceNumber
              )
            }}
          >
            Download edit report
          </a>
        </p>
      ) : null}
    </section>
  )
}

InstitutionStatus.propTypes = {
  institutionId: PropTypes.string,
  filing: PropTypes.object,
  submission: PropTypes.object,
  onDownloadClick: PropTypes.func
}

export default InstitutionStatus
