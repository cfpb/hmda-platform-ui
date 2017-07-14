import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({ type = 'info', heading, text, children }) => {
  if (!text) return null

  return (
    <div className={`usa-alert usa-alert-${type}`}>
      <div className="usa-alert-body">
        {heading ? <h3 className="usa-alert-heading">{heading}</h3> : null}
        <p className="usa-alert-text">{text}</p>
        {children}
      </div>
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  heading: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
}

export default Alert
