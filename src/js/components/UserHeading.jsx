import React, { PropTypes } from 'react'

const UserHeading = (props) => {
  if(!props.period || !props.institution) return null

  return (
    <div className="UserHeading" id="userHeading">
      <h1>Filing on behalf of {props.institution.name} for {props.period}</h1>
    </div>
  )
}

UserHeading.propTypes = {
  period: React.PropTypes.string.isRequired,
  institution: React.PropTypes.object.isRequired
}

export default UserHeading
