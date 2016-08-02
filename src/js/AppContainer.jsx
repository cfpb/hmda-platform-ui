import React from 'react'
import HomeLink from './HomeLink.jsx'

const AppContainer = (props) => (
  <div className="AppContainer">
    <HomeLink/>
    {props.children}
  </div>
)

export default AppContainer
