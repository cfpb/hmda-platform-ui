import React from 'react'
import NavHeader from '../components/NavHeader.jsx'

const Home = (props) => {
  return (
    <div className="Home">
      <NavHeader
        pathname={props.location.pathname}
        userName={props.user.profile.name} />
      <div id="main-content" className="usa-grid">
        <div className="usa-width-one-whole">
          <h2>Welcome to HMDA Filing{props.user.profile.name ? ' ' + props.user.profile.name : ''}</h2>
        </div>
      </div>
    </div>
  )
}

Home.defaultProps = {
  user: {profile: {name: null}}
}

export default Home
