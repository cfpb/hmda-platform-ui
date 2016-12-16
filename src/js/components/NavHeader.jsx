import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const styleSelectedPage = (selected, current) => {
  if(selected === current) return {textDecoration: 'underline'}
  return {textDecoration: 'none'}
}

const NavHeader = (props) => {
  console.log(props.page, props.base)
  return (
    <ul className="NavHeader">
      <li>
        <Link style={styleSelectedPage(props.page, 'upload')} to={props.base + '/upload'}>Upload</Link>
      </li>
      <li>
        <Link style={styleSelectedPage(props.page, 'edits')} to={props.base + '/edits'}>Edits</Link>
      </li>
      <li>
        <Link style={styleSelectedPage(props.page, 'summary')} to={props.base + '/summary'}>Summary</Link>
      </li>
    </ul>
  )
}

NavHeader.propTypes = {
  page: React.PropTypes.string,
  base: React.PropTypes.string
}

export default NavHeader
