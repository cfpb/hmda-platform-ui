import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import Loading from '../common/Loading.jsx'
import {
  VALIDATING,
  VALIDATED,
  SYNTACTICAL_VALIDITY_EDITS,
  QUALITY_EDITS,
  MACRO_EDITS
} from '../constants/statusCodes.js'

import './NavButton.css'

const NavButton = ({ page, base, code, editsFetched }) => {
  let className
  let suffix
  let spinOn = false
  const editFetchInProgress =
    code > VALIDATING && code < VALIDATED && !editsFetched
  const preError = code <= VALIDATING

  switch (page) {
    case 'upload':
      suffix = 'syntacticalvalidity'
      if (preError || editFetchInProgress) className = 'hidden'
      if (editFetchInProgress) spinOn = true
      break
    case 'syntacticalvalidity':
      suffix = 'quality'
      if (preError || code === SYNTACTICAL_VALIDITY_EDITS) className = 'hidden'
      break
    case 'quality':
      suffix = 'macro'
      if (preError || code === QUALITY_EDITS) className = 'hidden'
      break
    case 'macro':
      suffix = 'submission'
      if (preError || code === MACRO_EDITS) className = 'hidden'
      break
    default:
      return null
  }

  let displayName = suffix === 'syntacticalvalidity' ? '' : suffix
  displayName = suffix !== 'submission' ? `${displayName} Edits` : displayName

  return [
    spinOn ? (
      <React.Fragment>
        <Loading key="1" className="NavSpinner" />{' '}
        <span style={{ display: 'inline-block', marginLeft: '50px' }}>
          Retrieving your edits now
        </span>
      </React.Fragment>
    ) : null,
    <Link
      key="0"
      className={`NavButton button ${className || ''}`}
      tabIndex={className === 'hidden' ? -1 : 0}
      to={`${base}/${suffix}`}
    >
      {`Review ${displayName}`}
    </Link>
  ]
}

NavButton.propTypes = {
  page: PropTypes.string,
  base: PropTypes.string,
  code: PropTypes.number,
  //syntacticalValidityEditsExist: PropTypes.bool,
  //qualityVerified: PropTypes.bool,
  //macroVerified: PropTypes.bool,
  editsFetched: PropTypes.bool
}

export default NavButton
