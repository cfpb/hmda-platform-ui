import React, { PropTypes } from 'react'

const buttonClass='RefileButton usa-button usa-button-secondary usa-text-small'

const RefileButton = (props) => {
  return <a className={props.isLink ? '' : buttonClass}
    onClick={(e)=>{
      e.preventDefault()
      props.showConfirmModal()
    }}>upload a new file</a>
}

RefileButton.propTypes = {
  showConfirmModal: React.PropTypes.func.isRequired,
  isLink: React.PropTypes.bool
}

export default RefileButton
