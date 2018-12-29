import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { logout } from '../utils/redirect.js'
import BannerUSA from './BannerUSA.jsx'

export const addActiveClass = (selected, current) => {
  if (selected === current) return 'active'
  return null
}

export const logOutHandler = e => {
  e.preventDefault()
  logout()
}

export const makeNav = (props, page) => {
  let userHeader = (
    <ul className="usa-nav-primary">
      <li>
        <Link to={window.HMDA_ENV.APP_SUFFIX} className="usa-nav-link">
          Filing Home
        </Link>
      </li>
      {props.user ? (
        <li className="user">
          {props.user.profile.name}
          <a href="#" className="usa-nav-link" onClick={logOutHandler}>
            Logout
          </a>
        </li>
      ) : null}
    </ul>
  )

  if (page === 'oidc-callback') userHeader = null

  return <nav className="usa-nav">{userHeader}</nav>
}

const Header = props => {
  const page = props.pathname.split('/').slice(-1)[0]

  return (
    <header
      className="Header usa-header usa-header-basic"
      id="header"
      role="banner"
    >
      <BannerUSA />
      <section className="usa-nav-container">
        <div className="usa-logo" id="logo">
          <em className="usa-logo-text">
            <Link
              className="usa-nav-link"
              to={window.HMDA_ENV.APP_SUFFIX}
              title="Home"
              aria-label="Home"
            >
              <img src="/filing/img/ffiec-logo.svg" height="32px" alt="FFIEC" />
              HMDA Filing Platform
            </Link>
          </em>
        </div>
        {makeNav(props, page)}
      </section>
    </header>
  )
}

Header.propTypes = {
  user: PropTypes.object,
  pathname: PropTypes.string
}

export default Header
