import React from 'react'
import PropTypes from 'prop-types'

const RefileButton = props => {
  let refileStyle =
    'RefileButton usa-button usa-button-secondary usa-text-small'
  if (props.isLink) {
    refileStyle = ''
    if (props.isLower) {
      refileStyle = 'text-lowercase'
    }
    if (props.isSmall) {
      refileStyle = `${refileStyle} usa-text-small`
    }
  }

  return (
    <a
      href="#"
      className={refileStyle}
      onClick={e => {
        e.preventDefault()
        props.updateInstitution(props.institution)
        props.showConfirmModal()
      }}
    >
      Upload a new file
    </a>
  )
}

RefileButton.propTypes = {
  institution: PropTypes.object,
  updateInstitution: PropTypes.func.isRequired,
  showConfirmModal: PropTypes.func.isRequired,
  isLink: PropTypes.bool,
  isLower: PropTypes.bool,
  isSmall: PropTypes.bool
}

export default RefileButton
