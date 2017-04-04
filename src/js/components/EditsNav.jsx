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

const getNavClass = (name, props) => {
  let navClass
  const {
    code,
    page,
    syntacticalValidityEditsExist,
    qualityVerified,
    macroVerified
  } = props

  if(code > 7) {
    navClass = 'active'

    if(syntacticalValidityEditsExist && navNames.indexOf(name) > 1) {
      navClass = ''
    } else {
      navClass = 'complete'
    }
    if(!qualityVerified && navNames.indexOf(name) > 2) {
      navClass = ''
    } else {
      navClass = 'complete'
    }
    if(!macroVerified && navNames.indexOf(name) > 3) {
      navClass = ''
    } else {
      navClass = 'complete'
    }
  } else {
    navClass = ''
  }

  // when rendering the upload link its always active
  // but if code is greater than 7 (validating) its complete
  /*if(name === 'upload') {
    navClass = 'active'
    if(code > 7) {
      navClass = 'complete'
    }
  }


  //
  if(name === 'summary') {
    if(code < 9) {
      navClass = ''
    }
  }*/

  if(code === 10) navClass = 'complete'
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
  let progressWidth = '0%'

  if(code > 2) progressWidth = '10%'
  if(!syntacticalValidityEditsExist && code > 7) progressWidth = '30%'
  if(qualityVerified) progressWidth = '50%'
  if(macroVerified) progressWidth = '70%'
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

  const navClass = getNavClass(navLinks[name], props)

  let step
  if(navClass !== 'complete' && navClass !== 'complete current') step = i + 1

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

export { renderLinkOrText }
