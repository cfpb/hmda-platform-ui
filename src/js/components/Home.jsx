import React from 'react'
import Header from '../components/Header.jsx'

const Home = (props) => {
  return (
    <div className="Home">
      <Header
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
