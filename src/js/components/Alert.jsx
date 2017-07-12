import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({ type = 'info', heading, text }) => {
  if (!text) return null

  return (
    <div className={`usa-alert usa-alert-${type}`}>
      <div className="usa-alert-body">
        {heading ? <h3 className="usa-alert-heading">{heading}</h3> : null}
        <p className="usa-alert-text">{text}</p>
      </div>
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.string,
  heading: PropTypes.string,
  text: PropTypes.string.isRequired
}

export default Alert
