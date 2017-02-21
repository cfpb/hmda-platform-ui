import React, { PropTypes } from 'react'

const getText = (props) => {
  // not logged in, on home page
  let headingText = `Welcome to the ${props.period} HMDA filing.`

  // logged in, on home page
  if(props.userName) {
    headingText = `Welcome to the ${props.period} HMDA filing, ${props.userName}.`
  }

  // logged in, submission pages
  if(props.institution) {
    headingText = `${props.userName} filing on behalf of ${props.institution} for ${props.period}.`
  }

  return headingText
}

const UserHeading = (props) => {
  if(!props.period) return null

  return (
    <h2 className="UserHeading">{getText(props)}</h2>
  )
}

UserHeading.propTypes = {
  userName: React.PropTypes.string,
  period: React.PropTypes.string.isRequired,
  institution: React.PropTypes.string
}

export default UserHeading
