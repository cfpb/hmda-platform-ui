import React from 'react'
import PropTypes from 'prop-types'

const UserHeading = props => {
  if (!props.period || !props.institution) return null

  return (
    <section className="UserHeading" id="userHeading">
      <h1>
        Filing on behalf of {props.institution.name} for {props.period}
      </h1>
    </section>
  )
}

UserHeading.propTypes = {
  period: PropTypes.string.isRequired,
  institution: PropTypes.object.isRequired
}

export default UserHeading
