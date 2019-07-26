import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import RefileButton from '../refileButton/container.jsx'

import {
  FAILED,
  CREATED,
  PARSED_WITH_ERRORS,
  NO_SYNTACTICAL_VALIDITY_EDITS,
  VALIDATING,
  VALIDATED
} from '../constants/statusCodes.js'

import './ViewButton.css'

const InstitutionViewButton = ({ status, institution, filingPeriod }) => {
  const code = status ? status.code : CREATED
  let text
  if (code === FAILED) {
    return <RefileButton className="ViewButton" institution={institution} />
  } else if (code <= CREATED) {
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
      to={`/filing/${institution.year}/${institution.lei}/${filingPeriod}`}
    >
      {text}
    </Link>
  )
}

InstitutionViewButton.propTypes = {
  status: PropTypes.object,
  institution: PropTypes.object,
  filingPeriod: PropTypes.string,
  year: PropTypes.object
}

export default InstitutionViewButton
