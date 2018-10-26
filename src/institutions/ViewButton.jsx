import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import * as STATUS from '../constants/statusCodes.js'

const InstitutionViewButton = ({ status, institutionId, filingPeriod }) => {
  const code = status ? status.code : STATUS.CREATED
  let text

  if (code <= STATUS.CREATED) {
    text = 'Upload your file'
  } else if (code < STATUS.PARSED_WITH_ERRORS) {
    text = 'View upload progress'
  } else if (code === STATUS.PARSED_WITH_ERRORS) {
    text = 'Review formatting errors'
  } else if (code < STATUS.VALIDATED_WITH_ERRORS) {
    text = 'View progress'
  } else if (code === STATUS.VALIDATED_WITH_ERRORS) {
    text = 'Review edits'
  } else if (code === STATUS.VALIDATED) {
    text = 'Review summary'
  } else {
    text = 'View completed filing'
  }

  return (
    <Link
      className="status-button usa-button"
      to={`/filing/institutions/${institutionId}/${filingPeriod}`}
    >
      {text}
    </Link>
  )
}

InstitutionViewButton.propTypes = {
  status: PropTypes.object,
  institutionId: PropTypes.string,
  filingPeriod: PropTypes.string
}

export default InstitutionViewButton
