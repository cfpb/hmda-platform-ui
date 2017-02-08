import React, { PropTypes } from 'react'

const getText = (props) => {
  let headingText = 'Welcome to the ' + props.period + ' HMDA filing, ' + props.userName

  if (props.institution) {
    headingText = 'Filing on behalf of ' + props.institution;
  }

  return headingText
}

const UserHeading = (props) => {
  if(!props.userName) return null

  const headingText = getText(props)
  return (
    <h2 className="UserHeading">{headingText}</h2>
  )
}

UserHeading.propTypes = {
  userName: React.PropTypes.string.isRequired,
  period: React.PropTypes.string.isRequired,
  institution: React.PropTypes.string
}

export default UserHeading
