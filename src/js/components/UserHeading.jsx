import React, { Component, PropTypes } from 'react'

export default class UserHeading extends Component {
  render() {
    if(!this.props.userName) return null

    let headingText = 'Welcome to the ' + this.props.period + ' HMDA filing, ' + this.props.userName

    if (this.props.institution) {
      headingText = this.props.userName + ' filing on behalf of ' + this.props.institution;
    }

    return (
      <h1 className="UserHeading full">{headingText}</h1>
    )
  }
}

UserHeading.propTypes = {
  userName: React.PropTypes.string.isRequired,
  period: React.PropTypes.string.isRequired,
  institution: React.PropTypes.string
}
