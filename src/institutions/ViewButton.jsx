import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import * as STATUS from '../constants/statusCodes.js'

import './ViewButton.css'

const InstitutionViewButton = ({ status, institutionId, filingPeriod }) => {
  const code = status ? status.code : STATUS.CREATED
  let text

  if (code <= STATUS.CREATED) {
    text = 'Upload your file'
  } else if (code < STATUS.PARSED_WITH_ERRORS) {
    text = 'View upload progress'
  } else if (code === STATUS.PARSED_WITH_ERRORS) {
    text = 'Review formatting errors'
  } else if (code < STATUS.SYNTACTICAL_VALIDITY_EDITS) {
    text = 'View progress'
  } else if (code > STATUS.VALIDATING && code < STATUS.VALIDATED) {
    text = 'Review edits'
  } else if (code === STATUS.VALIDATED) {
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
