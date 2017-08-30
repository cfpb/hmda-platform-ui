import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import * as STATUS from '../constants/statusCodes.js'

const InstitutionViewButton = ({ status, institutionId, filingPeriod }) => {
  const code = status ? status.code : STATUS.CREATED
  let text = 'View current filing'

  if (code === STATUS.CREATED) {
    text = 'Begin filing'
  } else if (code === STATUS.SIGNED) {
    text = 'View completed filing'
  }

  return (
    <Link
      className="status-button usa-button"
      to={`/${institutionId}/${filingPeriod}`}
    >
      {text}
    </Link>
  )
}

InstitutionViewButton.PropTypes = {
  status: PropTypes.object,
  institutionId: PropTypes.string,
  filingPeriod: PropTypes.string
}

export default InstitutionViewButton
