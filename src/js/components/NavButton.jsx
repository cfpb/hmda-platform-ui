import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { VALIDATED_WITH_ERRORS } from '../constants/statusCodes.js'

const NavButton = ({
  page,
  base,
  code,
  syntacticalValidityEditsExist,
  qualityVerified,
  macroVerified
}) => {
  let className
  let suffix

  switch (page) {
    case 'upload':
      suffix = 'syntacticalvalidity'
      if(code < VALIDATED_WITH_ERRORS) className = 'hidden'
      break
    case 'syntacticalvalidity':
      suffix = 'quality'
      if(code < VALIDATED_WITH_ERRORS || syntacticalValidityEditsExist) className = 'hidden'
      break
    case 'quality':
      suffix = 'macro'
      if(code < VALIDATED_WITH_ERRORS || syntacticalValidityEditsExist || !qualityVerified) className = 'hidden'
      break
    case 'macro':
      suffix = 'submission'
      if(code < VALIDATED_WITH_ERRORS || syntacticalValidityEditsExist || !qualityVerified || !macroVerified) className = 'hidden'
      break
    default:
      return null
  }

  let displayName = (suffix === 'syntacticalvalidity') ? '' : suffix
  displayName = (suffix !== 'submission') ? `${displayName} Edits` : displayName

  return <Link
    className={`NavButton usa-button ${className || ''}`}
    tabIndex={className === 'hidden' ? -1 : 0}
    to={`${base}/${suffix}`}>
      {`Review ${displayName}`}
    </Link>

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
