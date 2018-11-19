import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import {
  CREATED,
  PARSED_WITH_ERRORS,
  NO_SYNTACTICAL_VALIDITY_EDITS,
  VALIDATING,
  VALIDATED
} from '../constants/statusCodes.js'

import './ViewButton.css'

const InstitutionViewButton = ({ status, institutionId, filingPeriod }) => {
  const code = status ? status.code : CREATED
  let text

  if (code <= CREATED) {
    text = 'Upload your file'
  } else if (code < PARSED_WITH_ERRORS) {
    text = 'View upload progress'
  } else if (code === PARSED_WITH_ERRORS) {
    text = 'Review formatting errors'
  } else if (code < NO_SYNTACTICAL_VALIDITY_EDITS) {
    text = 'View progress'
  } else if (code > VALIDATING && code < VALIDATED) {
    text = 'Review edits'
  } else if (code === VALIDATED) {
    text = 'Review summary'
  } else {
    text = 'View completed filing'
  }

  return (
    <Link
      className="ViewButton button"
      to={`/filing/${institutionId}/${filingPeriod}`}
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
