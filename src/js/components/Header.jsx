import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import BannerUSA from './BannerUSA.jsx'
import BannerUser from './BannerUser.jsx'

const styleSelectedPage = (selected, current) => {
  if(selected === current) return {borderBottom: '2px solid'}
  return {borderBottom: 'none'}
}

const Header = (props) => {
  const base = props.pathname.split('/').slice(0,-1).join('/')
  const page = props.pathname.split('/').slice(-1)[0]

  return (
    <header className="usa-header usa-header-basic" role="banner">
      {/* include usabanner here */}
      <BannerUSA />
      <BannerUser userName={props.userName} />
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
