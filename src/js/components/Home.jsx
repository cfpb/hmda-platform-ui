import React from 'react'
import NavHeader from '../components/NavHeader.jsx'

const Home = (props) => {
  const pathname = props.location.pathname
  const base = pathname.split('/').slice(0,-1).join('/')
  const page = pathname.split('/').slice(-1)[0]

  return (
    <div className="Home">
      <NavHeader
        page={page}
        base={base}
        userName={props.user.profile.name} />
      <div id="main-content" className="usa-grid">
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
