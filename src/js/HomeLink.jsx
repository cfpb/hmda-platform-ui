import React, { Component } from 'react'
import { Link } from 'react-router'

export default class HomeLink extends Component {
  render() {
    return (
      <div className="AppContainer">
        <Link className="HomeLink" to='/'>Home</Link><br />
        <img src="/img/ffiec-logo.png" width="150px"/>
      </div>
    )
  }
}
