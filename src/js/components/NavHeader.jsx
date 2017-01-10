import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const styleSelectedPage = (selected, current) => {
  if(selected === current) return {textDecoration: 'underline'}
  return {textDecoration: 'none'}
}

const NavHeader = (props) => {
  return (
    <nav role="navigation" className="NavHeader usa-nav">
      <div className="usa-nav-inner">
        <ul className="usa-nav-primary">
          <li>
            <Link className="usa-nav-link" style={styleSelectedPage(props.page, 'upload')} to={props.base + '/upload'}>Upload</Link>
          </li>
          <li>
            <Link className="usa-nav-link" style={styleSelectedPage(props.page, 'edits')} to={props.base + '/edits'}>Edits</Link>
          </li>
          <li>
            <Link className="usa-nav-link" style={styleSelectedPage(props.page, 'summary')} to={props.base + '/summary'}>Summary</Link>
          </li>
        </ul>
        <div className="usa-nav-secondary">
          <ul className="usa-unstyled-list usa-nav-secondary-links">
            <li>
              <Link className="usa-nav-link" style={styleSelectedPage(props.page, 'upload')} to={'/'}>Home</Link>
            </li>
            <li>
              <a href="#">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

NavHeader.propTypes = {
  page: React.PropTypes.string,
  base: React.PropTypes.string
}

export default NavHeader
