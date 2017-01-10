import React from 'react'
import NavHeader from '../components/NavHeader.jsx'

const Home = (props) => {
  const pathname = props.location.pathname
  const base = pathname.split('/').slice(0,-1).join('/')
  const page = pathname.split('/').slice(-1)[0]

  return (
    <div className="Home">
      <header className="usa-header usa-header-extended" role="banner">
        <div className="usa-banner">
          <header className="usa-banner-header">
            <div className="usa-grid usa-banner-inner">
              <img src="/img/favicons/favicon-57.png" alt="U.S. flag" />
              <p>An official website of the United States government</p>
            </div>
          </header>
        </div>
        <div className="usa-navbar">
          <div className="usa-logo" id="logo">
            <img src="/img/ffiec-logo.png" width="150px"/>
          </div>
        </div>
        <NavHeader page={page} base={base}/>
      </header>
      <div id="main-content" className="usa-grid-full">
        <div className="usa-width-one-whole">
          <h2>Welcome to HMDA Filing{props.user.profile.name ? ' ' + props.user.profile.name : ''}</h2>
          <a href="#" onClick={props.viewInstitutions}>View Institutions</a>
        </div>
      </div>
    </div>
  )
}

Home.defaultProps = {
  user: {profile: {name: null}}
}

export default Home
