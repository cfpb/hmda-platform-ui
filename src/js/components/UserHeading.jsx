import React, { PropTypes } from 'react'

const getText = (props) => {
  // home page
  let headingText = `Welcome to the ${props.period} HMDA filing`

  // submission pages
  if(props.institution) {
    headingText = `Filing on behalf of ${props.institution.name} for ${props.period}`
  }

  return headingText
}

const UserHeading = (props) => {
  if(!props.period) return null

  return (
    <div  className="UserHeading">
      <h2>{getText(props)}</h2>
    </div>
  )
}

UserHeading.propTypes = {
  period: React.PropTypes.string.isRequired,
  institution: React.PropTypes.object
}

export default UserHeading
