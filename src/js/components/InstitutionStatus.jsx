import React from 'react'
import PropTypes from 'prop-types'
import * as STATUS from '../constants/statusCodes.js'

export const getMessageClass = code => {
  let messageClass = 'text-primary'

  if (code === STATUS.CREATED) {
    messageClass = 'text-secondary'
  }

  if (
    code === STATUS.PARSED_WITH_ERRORS ||
    code === STATUS.VALIDATED_WITH_ERRORS
  ) {
    messageClass = 'text-secondary'
  }

  if (code === STATUS.SIGNED) {
    messageClass = 'text-green'
  }

  if (code === STATUS.FAILED) {
    messageClass = 'text-secondary'
  }

  return messageClass
}

const defaultSubmission = {
  status: {
    code: STATUS.CREATED,
    message: 'not started',
    description:
      'You may begin your filing process by selecting the "Begin Filing" button below.'
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
      <h4>
        Filing status:{' '}
        <strong className={getMessageClass(code)}>{message}</strong>
      </h4>
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

InstitutionStatus.PropTypes = {
  institutionId: PropTypes.string,
  filing: PropTypes.object,
  submission: PropTypes.object,
  onDownloadClick: PropTypes.func
}

export default InstitutionStatus
