import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { signinRedirect, logout } from '../redirect.js'
import BannerUSA from './BannerUSA.jsx'

const styleSelectedPage = (selected, current) => {
  if(selected === current) return {borderBottom: '2px solid'}
  return {borderBottom: 'none'}
}

const Header = (props) => {
  const base = props.pathname.split('/').slice(0,-1).join('/')
  const page = props.pathname.split('/').slice(-1)[0]

  return (
    <header className="usa-header usa-header-basic" role="banner">
      <BannerUSA />
      <div className="usa-nav-container">
        <div className="usa-navbar">
          <div className="usa-logo" id="logo">
            <img src="/img/ffiec-logo.png" width="125px"/>
          </div>
        </div>
        <nav role="navigation" className="Header usa-nav">
          <ul className="usa-nav-primary">
            <li>
              <Link className="usa-nav-link" style={styleSelectedPage(page, '')} to={'/'}>Home</Link>
            </li>
            <li>
              <Link className="usa-nav-link" style={styleSelectedPage(page, 'institutions')} to={'/institutions'}>Institutions</Link>
            </li>
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
      </div>
    </header>
  )
}

Header.propTypes = {
  userName: React.PropTypes.string,
  pathname: React.PropTypes.string
}

export default Header
