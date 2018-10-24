import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import Loading from '../common/Loading.jsx'
import { VALIDATED_WITH_ERRORS } from '../constants/statusCodes.js'

import './NavButton.css'

const NavButton = ({
  page,
  base,
  code,
  syntacticalValidityEditsExist,
  qualityVerified,
  macroVerified,
  editsFetched
}) => {
  let className
  let suffix
  let spinOn = false
  const editFetchInProgress = code === VALIDATED_WITH_ERRORS && !editsFetched
  const preError = code < VALIDATED_WITH_ERRORS

  switch (page) {
    case 'upload':
      suffix = 'syntacticalvalidity'
      if (preError) className = 'hidden'
      if (editFetchInProgress) spinOn = true
      break
    case 'syntacticalvalidity':
      suffix = 'quality'
      if (preError || syntacticalValidityEditsExist) className = 'hidden'
      break
    case 'quality':
      suffix = 'macro'
      if (preError || !qualityVerified) className = 'hidden'
      break
    case 'macro':
      suffix = 'submission'
      if (preError || !macroVerified) className = 'hidden'
      break
    default:
      return null
  }

  let displayName = suffix === 'syntacticalvalidity' ? '' : suffix
  displayName = suffix !== 'submission' ? `${displayName} Edits` : displayName

  return [
    <Link
      key="0"
      className={`NavButton usa-button ${className || ''}`}
      tabIndex={className === 'hidden' ? -1 : 0}
      to={`${base}/${suffix}`}
    >
      {`Review ${displayName}`}
    </Link>,
    spinOn ? <Loading key="1" className="NavSpinner" /> : null
  ]
}

NavButton.propTypes = {
  page: PropTypes.string,
  base: PropTypes.string,
  code: PropTypes.number,
  syntacticalValidityEditsExist: PropTypes.bool,
  qualityVerified: PropTypes.bool,
  macroVerified: PropTypes.bool,
  editsFetched: PropTypes.bool
}

export default NavButton
