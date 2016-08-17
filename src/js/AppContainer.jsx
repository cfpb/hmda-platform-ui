import React from 'react'
import HomeLink from './HomeLink.jsx'

const AppContainer = (props) => {
  return (
    <div className="AppContainer">
      <HomeLink/>
      {props.children}
    </div>
  )
}

export default AppContainer
