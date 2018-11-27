import React from 'react'
import PropTypes from 'prop-types'

import './Alert.css'

const Alert = ({
  type = 'info',
  heading,
  headingType='normal',
  imageText,
  children
}) => {
  if (!children) return null
  let alertText
  let alertClass = ''

  if (imageText) {
    alertText = imageText
  } else {
    // we use bg images for success and info
    // so these are classes
    if (type === 'success') alertClass = 'AlertImageCheck'
    if (type === 'error') alertClass = 'AlertImageClose'

    // we use text for info and warning
    // so no class is used, instead we put the content within the div
    if (type === 'info') {
      alertText = 'i'
    } else if (type === 'warning') {
      alertText = '!'
    } else {
      alertText = null
    }
  }

  let headingClass = 'alert-heading'
  if(headingType === 'small') headingClass += ' heading-small'

  return (
    <div className={`alert alert-${type}`}>
      {/*<div className={`AlertImage ${alertClass}`}>{alertText}</div>*/}
      <div className="alert-body">
        {heading ? <h3 className={headingClass}>{heading}</h3> : null}
        {React.cloneElement(children, { className: children.props.className || 'alert-text' })}
      </div>
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  heading: PropTypes.string,
  headingType: PropTypes.string
}

export default Alert
