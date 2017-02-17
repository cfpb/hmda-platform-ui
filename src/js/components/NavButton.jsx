import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const NavButton = (props) => {
  const {
    page,
    base,
    code,
    syntacticalValidityEditsExist,
    qualityVerified,
    macroVerified
  } = props

  let className
  let suffix
  let displayName

  switch (page) {
    case 'upload':
      suffix = 'syntacticalvalidity'
      displayName = 'edits'
      if(code < 8) className = 'usa-button-disabled'
      break
    case 'syntacticalvalidity':
      suffix = 'quality'
      if(code < 8 || syntacticalValidityEditsExist) className = 'usa-button-disabled'
      break
    case 'quality':
      suffix = 'macro'
      if(code < 8 || syntacticalValidityEditsExist || !qualityVerified) className = 'usa-button-disabled'
      break
    case 'macro':
      suffix = 'summary'
      if(code < 8 || syntacticalValidityEditsExist || !qualityVerified || !macroVerified) className = 'usa-button-disabled'
      break
    default:
      return null
  }

  if(!displayName) displayName = suffix

  return <Link
    className={`NavButton usa-button ${className}`}
    to={`${base}/${suffix}`}>{`Review ${displayName}`}</Link>

}

NavButton.propTypes = {
  page: React.PropTypes.string,
  base: React.PropTypes.string,
  code: React.PropTypes.number,
  syntacticalValidityEditsExist: React.PropTypes.bool,
  qualityVerified: React.PropTypes.bool,
  macroVerified: React.PropTypes.bool
}

export default NavButton
