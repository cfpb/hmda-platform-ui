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

const renderStep = (i) => {
  return <div className="step">{i+1}</div>
}

const renderLinkOrText = (props, name, i) => {

  let toRender
  let navClass
  const {
    page,
    base,
    code,
    syntacticalValidityEditsExist,
    qualityVerified,
    macroVerified
  } = props

  // always render the upload as a link
  if(name === 'upload') {
    toRender = (
      <Link
        className="usa-nav-link"
        to={`${base}/${navLinks[name]}`}>{name}</Link>
    )
  }

  // only render link when code > 7 (so it's finished validating)
  if(code > 7) {
    toRender = <Link className="usa-nav-link"  to={`${base}/${navLinks[name]}`}>{name}</Link>

    if(syntacticalValidityEditsExist && navNames.indexOf(name) > 1) {
      toRender = <span>{name}</span>
    }
    if(!qualityVerified && navNames.indexOf(name) > 2) {
      toRender = <span>{name}</span>
    }
    if(!macroVerified && navNames.indexOf(name) > 3) {
      toRender = <span>{name}</span>
    }
  } else {
    toRender = <span>{name}</span>
  }

  if(navLinks[name] === 'upload') navClass = 'active'
  if(navLinks[name] === 'upload' && code > 3) navClass = 'complete'

  if(navLinks[name] === 'syntacticalvalidity' && code > 7) navClass = 'active'
  if(navLinks[name] === 'syntacticalvalidity' && !syntacticalValidityEditsExist) navClass = 'complete'

  if(navLinks[name] === 'quality' && code > 7) navClass = 'active'
  if(navLinks[name] === 'quality' && qualityVerified) navClass = 'complete'

  if(navLinks[name] === 'macro' && code > 7) navClass = 'active'
  if(navLinks[name] === 'macro' && macroVerified) navClass = 'complete'

  if(navLinks[name] === 'summary' && (!syntacticalValidityEditsExist && qualityVerified && macroVerified)) navClass = 'active'
  if(navLinks[name] === 'summary' && code === 10) navClass = 'complete'

  if(navLinks[name] === page) navClass = 'current'

  return (
    <li className={navClass} key={i}>
      {renderStep(i)}
      {toRender}
    </li>
  )
}

const EditsNav = (props) => {
  let progress = '0%'
  if(props.code > 2) progress = '10%'
  if(props.syntacticalValidityEditsExist) progress = '30%'
  if(!props.syntacticalValidityEditsExist) progress = '50%'
  if(props.macroVerified) progress = '70%'
  if(props.code === 10) progress = '100%'

  return <div className="EditsNav">
    <ul className="usa-nav-primary">
      {
        navNames.map((pageObj, i) => {
          return renderLinkOrText(props, pageObj, i)
        })
      }
    </ul>
    <hr className="line" />
    <hr className="progress" width={progress} />
  </div>
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

export { renderLinkOrText }
