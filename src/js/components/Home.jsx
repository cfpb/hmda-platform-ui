import React from 'react'

const Home = (props) => {
  return (
    <div className="Home">
      <h2>Welcome to HMDA Filing</h2>
      <a href="#" onClick={props.viewInstitutions}>View Institutions</a>
    </div>
  )
}

export default Home
