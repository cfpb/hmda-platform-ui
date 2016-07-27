import React from 'react'
import HomeLink from './HomeLink.jsx'

const AppContainer = () => (
  <div className="AppContainer">
    <HomeLink/>
    {this.props.children}
  </div>
)

export default AppContainer
