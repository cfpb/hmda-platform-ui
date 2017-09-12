import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({ type = 'info', heading, linebreak, children }) => {
  if (!children) return null

  return (
    <div className={`usa-alert usa-alert-${type}`}>
      <div className="usa-alert-body">
        {heading
          ? <h3 className="usa-alert-heading">
              {type === 'success' ? <span className='alert-check'></span> : null}
              {heading}
            </h3>
          : null
        }
        {linebreak ? <hr /> : null}
        {React.cloneElement(children, {className: 'usa-alert-text'})}
      </div>
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  heading: PropTypes.string,
  linebreak: PropTypes.bool
}

export default Alert
