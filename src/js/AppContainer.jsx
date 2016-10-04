import React from 'react'
import HomeLink from './components/HomeLink.jsx'

const AppContainer = (props) => {
  return (
    <div className="AppContainer usa-grid">
      <HomeLink/><br />
      <img src="/img/ffiec-logo.png" width="150px"/>
      {props.children}
    </div>
  )
}

export default AppContainer
