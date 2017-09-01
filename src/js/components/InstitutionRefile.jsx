import React from 'react'
import PropTypes from 'prop-types'
import RefileButton from '../containers/RefileButton.jsx'
import * as STATUS from '../constants/statusCodes.js'

const InstitutionRefile = ({ status, filing }) => {
  if (!status) return null
  if (
    status.code === STATUS.PARSED_WITH_ERRORS ||
    status.code > STATUS.VALIDATING
  ) {
    return (
      <RefileButton
        id={filing.institutionId}
        filing={filing.period}
        code={status.code}
        isLink={true}
        isSmall={true}
      />
    )
  } else {
    return null
  }
}

InstitutionRefile.PropTypes = {
  status: PropTypes.object,
  filing: PropTypes.object
}

export default InstitutionRefile
