import React, { PropTypes } from 'react'

const RefileButton = (props) => {
  let refileStyle = 'RefileButton usa-button usa-button-secondary usa-text-small'
  if(props.isLink) {
    refileStyle = ''
    if(props.isLower) {
      refileStyle = 'text-lowercase'
    }
    if(props.isSmall) {
      refileStyle = `${refileStyle} usa-text-small`
    }
  }

  return <a className={refileStyle}
    onClick={(e)=>{
      e.preventDefault()
      props.showConfirmModal()
    }}>Upload a new file</a>
}

RefileButton.propTypes = {
  showConfirmModal: React.PropTypes.func.isRequired,
  isLink: React.PropTypes.bool,
  isLower: React.PropTypes.bool,
  isSmall: React.PropTypes.bool
}

export default RefileButton
