import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { signinRedirect, logout } from '../redirect.js'
import BannerUSA from './BannerUSA.jsx'

export const addActiveClass = (selected, current) => {
  if(selected === current) return 'active'
  return null
}

const Header = (props) => {
  const page = props.pathname.split('/').slice(-1)[0]

  return (
    <header className="Header usa-header usa-header-basic" role="banner">
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
        <nav role="navigation" className="usa-nav">
          {props.userName
          ?
          <ul className="usa-nav-primary">
            <li>{props.userName}</li>
            <li className="nav-institutions">
              <Link
                className={`usa-nav-link ${addActiveClass(page, 'institutions')}`}
                to="/institutions">My Institutions</Link>
            </li>
            <li><a className="usa-nav-link" href="#" onClick={(e) => {
               e.preventDefault()
               logout()
             }}>Logout</a></li>
          </ul>
          :
          <ul className="usa-nav-primary">
            <li><Link to="/institutions" className="usa-button">Login</Link></li>
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
