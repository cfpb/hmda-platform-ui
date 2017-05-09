import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const navNames = [
  'upload',
  'syntactical & validity edits',
  'quality edits',
  'macro quality edits',
  'confirmation'
]

const navLinks = {
  'upload': 'upload',
  'syntactical & validity edits': 'syntacticalvalidity',
  'quality edits': 'quality',
  'macro quality edits': 'macro',
  'confirmation': 'confirmation'
}

const getNavClass = (name, props) => {
  let navClass = ''
  const {
    code,
    page,
    syntacticalValidityEditsExist,
    qualityVerified,
    macroVerified
  } = props

  switch(name) {
    case 'upload':
      navClass = 'active'
      if(code > 7) navClass = 'complete'
      break
    case 'syntacticalvalidity':
      if(code > 7) {
        navClass = 'active'
        if(!syntacticalValidityEditsExist) navClass = 'complete'
      }
      break
    case 'quality':
      if(code > 7) {
        if(!syntacticalValidityEditsExist) {
          navClass = 'active'
          if(qualityVerified) navClass = 'complete'
        }
      }
      break
    case 'macro':
      if(code > 7) {
        if(!syntacticalValidityEditsExist && qualityVerified) {
          navClass = 'active'
          if(macroVerified) navClass = 'complete'
        }
      }
      break
  }

  // catch all if validated
  if(code > 8) navClass = 'complete'
  if(code === 9 && name === 'confirmation') navClass = 'active'
  // add current class if page matches the name
  if(name === page) navClass = `${navClass} current`

  return navClass
}

const getProgressWidth = (props) => {
  const {
    code,
    syntacticalValidityEditsExist,
    qualityVerified,
    macroVerified
  } = props
  let progressWidth = '10%'

  if(code > 5) progressWidth = '30%'
  if(code > 7 && !syntacticalValidityEditsExist) progressWidth = '50%'
  if(!syntacticalValidityEditsExist && qualityVerified) progressWidth = '70%'
  if(!syntacticalValidityEditsExist && qualityVerified && macroVerified) progressWidth = '90%'
  if(code === 10) progressWidth = '100%'

  return progressWidth
}

const renderLinkOrText = (props, name, i) => {
  let toRender
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
    if(code < 9) {
      if(syntacticalValidityEditsExist && navNames.indexOf(name) > 1) {
        toRender = <span>{name}</span>
      }
      if(!qualityVerified && navNames.indexOf(name) > 2) {
        toRender = <span>{name}</span>
      }
      if(!macroVerified && navNames.indexOf(name) > 3) {
        toRender = <span>{name}</span>
      }
    }
  } else {
    toRender = <span>{name}</span>
  }

  let navClass = getNavClass(navLinks[name], props)

  let step
  if(navClass !== 'complete' && navClass !== 'complete current') step = i + 1

  // add syntacticalvalidity class to syntacticalvalidity li
  // used to target this link for fixing the nav at smaller screensizes
  // used in sass/components/EditsNav.scss
  if(navLinks[name] === 'syntacticalvalidity') navClass = `${navClass} syntacticalvalidity`

  return (
    <li className={navClass} key={i}>
      <div className="step">{step}</div>
      {toRender}
    </li>
  )
}

const EditsNav = (props) => {
  return <div className="EditsNav">
    <ul className="usa-nav-primary">
      {
        navNames.map((pageObj, i) => {
          return renderLinkOrText(props, pageObj, i)
        })
      }
    </ul>
    <hr className="line" />
    <hr className="progress" width={getProgressWidth(props)} />
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

export {
  renderLinkOrText,
  getProgressWidth,
  getNavClass
}
