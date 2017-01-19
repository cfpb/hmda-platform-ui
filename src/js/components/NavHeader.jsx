import React, { PropTypes } from 'react'
import { signinRedirect, logout } from '../redirect.js'
import { Link } from 'react-router'

const noEditsNav = ['', 'institutions']

const renderEditsNav = (page, base) => {
  if(noEditsNav.indexOf(page) === -1) return (
    <ul className="usa-nav-primary">
      <li>
        <Link className="usa-nav-link" style={styleSelectedPage(page, 'upload')} to={base + '/upload'}>Upload</Link>
      </li>
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

const styleSelectedPage = (selected, current) => {
  if(selected === current) return {textDecoration: 'underline'}
  return {textDecoration: 'none'}
}

const NavHeader = (props) => {
  const base = props.pathname.split('/').slice(0,-1).join('/')
  const page = props.pathname.split('/').slice(-1)[0]

  return (
    <header className="usa-header usa-header-basic" role="banner">
      <div className="usa-banner">
        <header className="usa-banner-header">
          <div className="usa-grid usa-banner-inner">
            <img src="/img/favicons/favicon-57.png" alt="U.S. flag" />
            <p>An official website of the United States government</p>
          </div>
        </header>
      </div>
      <div className="usa-nav-container">
        <div className="usa-navbar">
          <div className="usa-logo" id="logo">
            <img src="/img/ffiec-logo.png" width="150px"/>
          </div>
        </div>
        <nav role="navigation" className="NavHeader usa-nav">
          <ul className="usa-nav-primary">
            <li>
              <Link className="usa-nav-link" style={styleSelectedPage(page, '')} to={'/'}>Home</Link>
            </li>
            <li>
              <Link className="usa-nav-link" style={styleSelectedPage(page, 'institutions')} to={'/institutions'}>Institutions</Link>
            </li>
              {props.userName
              ?
                <li><a className="usa-nav-link" href="#" onClick={(e) => {
                 e.preventDefault()
                 logout()
                }}>Logout - <strong>{props.userName}</strong></a></li>
              :
                <li><a className="usa-nav-link" href="#" onClick={(e) => {
                  e.preventDefault()
                  signinRedirect(true)
                }}>Login</a></li>
              }
          </ul>
        </nav>
      </div>
      {renderEditsNav(page, base)}
    </header>
  )
}

NavHeader.propTypes = {
  userName: React.PropTypes.string,
  pathname: React.PropTypes.string
}

export default NavHeader
