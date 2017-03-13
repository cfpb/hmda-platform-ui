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

const renderStep = (i) => {
  return <div className="step">{i+1}</div>
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
        style={styleSelectedPage(page, name)}
        to={`${base}/${navLinks[name]}`}>{name}</Link>
    )
  }

  // only render link when code > 7 (so it's finished validating)
  if(code > 7) {
    toRender = <Link className="usa-nav-link" style={styleSelectedPage(page, navLinks[name])} to={`${base}/${navLinks[name]}`}>{name}</Link>

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

  return (
    <li key={i}>
      {/*renderStep(i)*/}
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
    {/*
    <hr className="line" />

    TODO: set the width of the progress <hr> based on submission status wait for https://github.com/cfpb/hmda-platform/issues/849

    <hr className="progress" width="0" />
    */}
    <hr className="navBorder" />
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

export { styleSelectedPage, renderLinkOrText }
