import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({ type = 'info', heading, children }) => {
  if (!children) return null

  return (
    <div className={`usa-alert usa-alert-${type}`}>
      <div className="usa-alert-body">
        {heading
          ? <h3 className="usa-alert-heading">
              {heading}
              {type === 'success' ? <span className='alert-check'></span> : null}
            </h3>
          : null
        }
        {React.cloneElement(children, {className: 'usa-alert-text'})}
      </div>
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  heading: PropTypes.string
}

export default Alert
