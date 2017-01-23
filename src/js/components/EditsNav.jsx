import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const noEditsNav = ['', 'institutions']

const styleSelectedPage = (selected, current) => {
  if(selected === current) return {borderBottom: '2px solid'}
  return {borderBottom: 'none'}
}

const renderLinkOrText = (props, linkTo) => {
  const { page, base, code } = props
  // only render link when code > 7 (so it's finished validating)
  if(code > 7) {
    return <Link className="usa-nav-link" style={styleSelectedPage(page, linkTo)} to={`${base}/${linkTo}`}>{linkTo}</Link>
  } else {
    return <span>{linkTo}</span>
  }
}

const EditsNav = (props) => {
  const { page, base, code } = props

  if(noEditsNav.indexOf(page) === -1) return (
    <ul className="EditsNav usa-nav-primary">
      <li>
        <Link className="usa-nav-link" style={styleSelectedPage(page, 'upload')} to={base + '/upload'}>Upload</Link>
      </li>
      <li>
        {renderLinkOrText(props, 'edits')}
      </li>
      <li>
        {renderLinkOrText(props, 'summary')}
      </li>
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
