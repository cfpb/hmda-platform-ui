import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { signinRedirect, logout } from '../redirect.js'
import BannerUSA from './BannerUSA.jsx'

export const styleSelectedPage = (selected, current) => {
  if(selected === current) return {borderBottom: '2px solid'}
  return {}
}

export const renderInstitutionLink = (props) => {
  if(!props.userName) return null
  return <li>
    <Link className="usa-button usa-button-outline" to={'/institutions'}>Institutions</Link>
  </li>
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
          <ul className="usa-nav-primary">
            {props.userName
            ?
              <li className="logout">{props.userName} - <a className="usa-nav-link" href="#" onClick={(e) => {
               e.preventDefault()
               logout()
             }}>Logout</a></li>
            :
              <li><a className="usa-button" href="#" onClick={(e) => {
                e.preventDefault()
                signinRedirect(true)
              }}>Login</a></li>
            }
          </ul>
        </nav>
        <nav role="navigation" className="Header usa-nav">
          <ul className="usa-nav-primary">
            <li>
              <Link className="usa-nav-link" style={styleSelectedPage(page, '')} to={'/'}>Home</Link>
            </li>
            {renderInstitutionLink(props)}
          </ul>
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
