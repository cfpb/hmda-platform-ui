import React from 'react'
import PropTypes from 'prop-types'
import RefileButton from '../refileButton/container.jsx'
import * as STATUS from '../constants/statusCodes.js'

const InstitutionRefile = ({ status, institution }) => {
  if (!status || !status.code) return null
  if (
    status.code === STATUS.PARSED_WITH_ERRORS ||
    status.code > STATUS.VALIDATING
  ) {
    return (
      <RefileButton institution={institution} isLink={true} isSmall={true} />
    )
  } else {
    return null
  }
}

InstitutionRefile.PropTypes = {
  status: PropTypes.object,
  institution: PropTypes.object
}

export default InstitutionRefile
