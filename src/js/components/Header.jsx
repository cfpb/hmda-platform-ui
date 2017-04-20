import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { signinRedirect, logout } from '../redirect.js'
import BannerUSA from './BannerUSA.jsx'

export const styleSelectedPage = (selected, current) => {
  if(selected === current) return {borderBottom: '2px solid'}
  return {}
}

export const renderLoggedInNav = (props) => {
  if(!props.userName) return null
  return (
    <nav role="navigation" className="Header usa-nav">
      <ul className="usa-nav-primary">
        <li>
          <Link className="usa-nav-link" style={styleSelectedPage(page, '')} to={'/'}>Home</Link>
        </li>
        <li>
          <Link className="usa-button usa-button-outline" to={'/institutions'}>Institutions</Link>
        </li>
      </ul>
    </nav>
  )
}

const Header = (props) => {
  const page = props.pathname.split('/').slice(-1)[0]
  return (
    <header className="usa-header usa-header-basic" role="banner">
      <BannerUSA />
      <div className="usa-nav-container">
        <div className="usa-logo" id="logo">
          <em className="usa-logo-text">
            <Link
              className="usa-nav-link"
              to={'/'}
              title="Home"
              aria-label="Home">HMDA Filing</Link>
          </em>
        </div>
        <nav role="navigation" className="Header usa-nav">
          {props.userName
          ?
          <ul className="usa-nav-primary">
            <li>
              <Link className="usa-nav-link" style={styleSelectedPage(page, '')} to={'/'}>Home</Link>
            </li>
            <li>
              <Link className="usa-button usa-button-outline" to={'/institutions'}>Institutions</Link>
            </li>
            <li className="logout">{props.userName} - <a className="usa-nav-link" href="#" onClick={(e) => {
               e.preventDefault()
               logout()
             }}>Logout</a></li>
          </ul>
          :
          <ul className="usa-nav-primary">
            <li><Link to={'/institutions'} className="usa-button">Login</Link></li>
          </ul>
          }
        </nav>
      </div>
    </header>
  )
}

Header.propTypes = {
  userName: React.PropTypes.string,
  pathname: React.PropTypes.string
}

export default Header
