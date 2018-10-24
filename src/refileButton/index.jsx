import React from 'react'
import PropTypes from 'prop-types'

import './RefileButton.css'

const RefileButton = props => {
  let refileStyle = 'RefileButton usa-button usa-text-small'
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
    <button
      className={refileStyle}
      onClick={e => {
        e.preventDefault()
        if (props.institution) {
          props.updateInstitution(props.institution.id)
        }
        props.showConfirmModal()
      }}
    >
      Upload a new file
    </button>
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
