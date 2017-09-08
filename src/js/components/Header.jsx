import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { logout } from '../utils/redirect.js'
import HomeLink from '../components/HomeLink.jsx'
import BannerBeta from '../components/BannerBeta.jsx'
import BannerUSA from './BannerUSA.jsx'
import BannerDeadline from '../containers/BannerDeadline.jsx'

export const addActiveClass = (selected, current) => {
  if(selected === current) return 'active'
  return null
}

const makeNav = (props, page) => {
  let userHeader = (
    <ul className="usa-nav-primary">
      {props.user ? <li>{props.user.profile.name}</li> : null}
      {props.user ? <li><a className="usa-nav-link" href="#" onClick={(e) => {
         e.preventDefault()
         logout()
      }}>Logout</a></li> : null}
      <li><HomeLink/></li>
    </ul>
  )

  if(page === 'oidc-callback') userHeader = null

  return <nav role="navigation" className="usa-nav">
    {userHeader}
  </nav>
}

const Header = (props) => {
  const page = props.pathname.split('/').slice(-1)[0]

  return (
    <header className="Header usa-header usa-header-basic" id="header" role="banner">
      <BannerBeta />
      <BannerUSA />
      <BannerDeadline />
      <section className="usa-nav-container">
        <div className="usa-logo" id="logo">
          <em className="usa-logo-text">
            <Link
              className="usa-nav-link"
              to={'/'}
              title="Home"
              aria-label="Home">HMDA Platform</Link>
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
