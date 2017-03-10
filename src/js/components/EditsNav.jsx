import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const navNames = [
  'upload',
  'syntactical & validity edits',
  'quality edits',
  'macro quality edits',
  'summary'
]

const navLinks = {
  'upload': 'upload',
  'syntactical & validity edits': 'syntacticalvalidity',
  'quality edits': 'quality',
  'macro quality edits': 'macro',
  'summary': 'summary'
}

const styleSelectedPage = (selected, current) => {
  if(selected === current) return {borderBottom: '2px solid'}
  return {borderBottom: 'none'}
}

const renderLinkOrText = (props, name) => {
  const {
    page,
    base,
    code,
    syntacticalValidityEditsExist,
    qualityVerified,
    macroVerified
  } = props

  // always render the upload as a link
  if(name === 'upload') return (
    <Link className="usa-nav-link" style={styleSelectedPage(page, name)}
      to={`${base}/${navLinks[name]}`}>{name}</Link>
  )

  // only render link when code > 7 (so it's finished validating)
  if(code > 7) {
    if(syntacticalValidityEditsExist && navNames.indexOf(name) > 1) return <span>{name}</span>
    if(!qualityVerified && navNames.indexOf(name) > 2) return <span>{name}</span>
    if(!macroVerified && navNames.indexOf(name) > 3) return <span>{name}</span>
    return <Link className="usa-nav-link" style={styleSelectedPage(page, name)} to={`${base}/${navLinks[name]}`}>{name}</Link>
  } else {
    return <span>{name}</span>
  }
}

const EditsNav = (props) => {
  return <ul className="EditsNav usa-nav-primary">
    {
      navNames.map((pageObj, i) => {
        return <li key={i}>{renderLinkOrText(props, pageObj)}</li>
      })
    }
  </ul>
}

EditsNav.propTypes = {
  page: React.PropTypes.string.isRequired,
  base: React.PropTypes.string.isRequired,
  code: React.PropTypes.number.isRequired,
  syntacticalValidityEditsExist: React.PropTypes.bool.isRequired,
  qualityVerified: React.PropTypes.bool.isRequired,
  macroVerified: React.PropTypes.bool.isRequired
}

export default EditsNav

export { styleSelectedPage, renderLinkOrText }
