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

  const disabled = ' usa-button-disabled'
  let className = 'usa-button NavButton'
  let suffix
  let displayName

  switch (page) {
    case 'upload':
      suffix = 'syntacticalvalidity'
      displayName = 'edits'
      if(code < 8) className+=disabled
      break
    case 'syntacticalvalidity':
      suffix = 'quality'
      if(syntacticalValidityEditsExist) className+=disabled
      break
    case 'quality':
      suffix = 'macro'
      if(!qualityVerified) className+=disabled
      break
    case 'macro':
      suffix = 'summary'
      if(!qualityVerified || !macroVerified) className+=disabled
      break
    default:
      return null
  }

  if(!displayName) displayName = suffix

  return <Link className={className} to={`${base}/${suffix}`}>{`Review ${displayName} \u21D2`}</Link>

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
