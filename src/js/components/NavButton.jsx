import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import LoadingIcon from './LoadingIcon.jsx'
import { VALIDATED_WITH_ERRORS } from '../constants/statusCodes.js'

const NavButton = ({
  page,
  base,
  code,
  syntacticalValidityEditsExist,
  qualityVerified,
  macroVerified,
  fetched
}) => {
  let className
  let suffix
  let spinOn = false
  const editFetchInProgress = code === VALIDATED_WITH_ERRORS && !fetched
  const preError = code < VALIDATED_WITH_ERRORS || editFetchInProgress

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
    <div key="1" className="NavSpinner">
      {spinOn ? <LoadingIcon /> : null}
    </div>
  ]
}

NavButton.propTypes = {
  page: PropTypes.string,
  base: PropTypes.string,
  code: PropTypes.number,
  syntacticalValidityEditsExist: PropTypes.bool,
  qualityVerified: PropTypes.bool,
  macroVerified: PropTypes.bool
}

export default NavButton
