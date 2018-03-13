import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { logout } from '../utils/redirect.js'
import HomeLink from './HomeLink.jsx'
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
      {props.user ? <li>{props.user.profile.name}</li> : null}
      {props.user ? (
        <li>
          <a href="#" className="usa-nav-link" onClick={logOutHandler}>
            Logout
          </a>
        </li>
      ) : null}
      <li>
        <HomeLink />
      </li>
      {props.user ? null : (
        <React.Fragment>
          <li>
            <a href="/publication/" className="usa-nav-link">
              Publication
            </a>
          </li>
          <li>
            <a href="/tools/" className="usa-nav-link">
              Tools
            </a>
          </li>
        </React.Fragment>
      )}
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
              to={'/'}
              title="Home"
              aria-label="Home"
            >
              <img src="/img/ffiec-logo.png" width="100px" alt="FFIEC" />
              HMDA Platform
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
