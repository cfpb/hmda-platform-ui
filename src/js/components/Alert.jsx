import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({ type = 'info', heading, children }) => {
  if (!children) return null
  const alertText = type === 'info' ? 'i' : type === 'warning' ? '!' : null

  return (
    <div className={`usa-alert usa-alert-${type}`}>
      <div className="AlertImage">{alertText}</div>
      <div className="usa-alert-body">
        {heading ? <h3 className="usa-alert-heading">{heading}</h3> : null}
        {React.cloneElement(children, { className: 'usa-alert-text' })}
      </div>
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  heading: PropTypes.string
}

export default Alert
