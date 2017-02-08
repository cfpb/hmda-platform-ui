import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const noEditsNav = ['', 'institutions']

const formatLink = (link) => {
  return link.replace(/[^a-zA-Z]/g,'')
}

const styleSelectedPage = (selected, current) => {
  if(selected === formatLink(current)) return {borderBottom: '2px solid'}
  return {borderBottom: 'none'}
}

const renderLinkOrText = (props, linkTo) => {
  const { page, base, code } = props

  // always render the upload as a link
  if(linkTo === 'upload') return (
    <Link className="usa-nav-link" style={styleSelectedPage(page, linkTo)}
      to={`${base}/${linkTo}`}>{linkTo}</Link>
  )

  // only render link when code > 7 (so it's finished validating)
  if(code > 7) {
    return <Link className="usa-nav-link" style={styleSelectedPage(page, linkTo)} to={`${base}/${formatLink(linkTo)}`}>{linkTo}</Link>
  } else {
    return <span>{linkTo}</span>
  }
}

const EditsNav = (props) => {
  const { page, base, code } = props
  const editPages = ['upload', 'syntactical & validity', 'quality', 'macro', 'summary']

  if(noEditsNav.indexOf(page) === -1) return (
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
  code: React.PropTypes.number
}

export default EditsNav
