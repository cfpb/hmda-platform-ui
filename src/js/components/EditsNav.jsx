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

  let step = i + 1
  let navClass

  // when rendering the upload link its always active
  // but if code is greater than 7 (validating) its complete
  if(navLinks[name] === 'upload') {
    navClass = 'active'
    if(code > 7) {
      navClass = 'complete'
    }
  } else if(code > 7) { // for other links, if code is greater than 7 they are active
    navClass = 'active'
  }

  if(navLinks[name] === 'syntacticalvalidity' && !syntacticalValidityEditsExist) {
    navClass = 'complete'
  }

  if(navLinks[name] === 'quality' && qualityVerified) {
    navClass = 'complete'
  }

  if(navLinks[name] === 'macro' && macroVerified) {
    navClass = 'complete'
  }

  if(navLinks[name] === 'summary') {
    if(code < 9) {
      navClass = ''
    }
  }

  if(code === 10) navClass = 'complete'
  if(navClass === 'complete') step = <img src="/img/correct8.png" />

  if(navLinks[name] === page) navClass = 'current'

  return (
    <li className={navClass} key={i}>
      <div className="step">{step}</div>
      {toRender}
    </li>
  )
}

const EditsNav = (props) => {
  let progress = '0%'
  if(props.code > 2) progress = '10%'
  if(props.syntacticalValidityEditsExist && props.code > 7) progress = '30%'
  if(!props.syntacticalValidityEditsExist && props.code > 7) progress = '50%'
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
