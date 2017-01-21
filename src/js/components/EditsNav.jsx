import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const noEditsNav = ['', 'institutions', 'upload']

const styleSelectedPage = (selected, current) => {
  if(selected === current) return {borderBottom: '2px solid'}
  return {borderBottom: 'none'}
}

const EditsNav = (props) => {
  const { page, base } = props

  if(noEditsNav.indexOf(page) === -1) return (
    <ul className="usa-nav-primary">
      <li>
        <Link className="usa-nav-link" style={styleSelectedPage(page, 'edits')} to={base + '/edits'}>Edits</Link>
      </li>
      <li>
        <Link className="usa-nav-link" style={styleSelectedPage(page, 'summary')} to={base + '/summary'}>Summary</Link>
      </li>
    </ul>
  )

  return null
}

EditsNav.propTypes = {
  page: React.PropTypes.string,
  base: React.PropTypes.string
}

export default EditsNav
