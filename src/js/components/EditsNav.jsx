import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const noEditsNav = ['', 'institutions']
const editPages = ['upload', 'syntactical & validity', 'quality', 'macro', 'summary']

const formatLink = (link) => {
  return link.replace(/[^a-zA-Z]/g,'')
}

const styleSelectedPage = (selected, current) => {
  if(selected === formatLink(current)) return {borderBottom: '2px solid'}
  return {borderBottom: 'none'}
}

const renderLinkOrText = (props, linkTo) => {
  const {
    page,
    base,
    code,
    syntacticalValidityEditsExist,
    qualityVerified,
    macroVerified
  } = props

  // always render the upload as a link
  if(linkTo === 'upload') return (
    <Link className="usa-nav-link" style={styleSelectedPage(page, linkTo)}
      to={`${base}/${linkTo}`}>{linkTo}</Link>
  )

  // only render link when code > 7 (so it's finished validating)
  if(code > 7) {
    if(syntacticalValidityEditsExist && editPages.indexOf(linkTo) > 1) return <span>{linkTo}</span>
    if(!qualityVerified && editPages.indexOf(linkTo) > 2) return <span>{linkTo}</span>
    if(!macroVerified && editPages.indexOf(linkTo) > 3) return <span>{linkTo}</span>
    return <Link className="usa-nav-link" style={styleSelectedPage(page, linkTo)} to={`${base}/${formatLink(linkTo)}`}>{linkTo}</Link>
  } else {
    return <span>{linkTo}</span>
  }
}

const EditsNav = (props) => {

  if(noEditsNav.indexOf(props.page) === -1) return (
    <ul className="EditsNav usa-nav-primary">
      {
        editPages.map((page, i) => {
          return <li key={i}>{renderLinkOrText(props, page)}</li>
        })
      }
    </ul>
  )

  return null
}

EditsNav.propTypes = {
  page: React.PropTypes.string,
  base: React.PropTypes.string,
  code: React.PropTypes.number,
  syntacticalValidityEditsExist: React.PropTypes.bool,
  qualityVerified: React.PropTypes.bool,
  macroVerified: React.PropTypes.bool
}

export default EditsNav
