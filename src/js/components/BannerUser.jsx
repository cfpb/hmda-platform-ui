import React, { PropTypes } from 'react'
import { signinRedirect, logout } from '../redirect.js'

const BannerUser = (props) => {
  return (
    <div className="BannerUser">
      <header className="usa-nav-container">
        <nav role="navigation" className="usa-nav usa-banner-inner">
            {props.userName
            ?
              <span>{props.userName} - <a className="usa-nav-link" href="#" onClick={(e) => {
               e.preventDefault()
               logout()
              }}>Logout</a></span>
            :
              <a className="usa-button" href="#" onClick={(e) => {
                e.preventDefault()
                signinRedirect(true)
              }}>Login</a>
            }

        </nav>
      </header>
    </div>
  )
}

BannerUser.propTypes = {
  userName: React.PropTypes.string
}

export default BannerUser
