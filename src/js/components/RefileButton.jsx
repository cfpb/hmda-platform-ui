import React, { PropTypes } from 'react'

const buttonClass='RefileButton usa-button usa-button-secondary usa-text-small'

const RefileButton = (props) => {
  return <a className={props.isLink ? '' : buttonClass}
    onClick={(e)=>{
      e.preventDefault()
      props.showConfirmModal(props.id, props.filing, props.code)
    }}>upload a new file</a>
}

RefileButton.propTypes = {
  showConfirmModal: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
  filing: React.PropTypes.string.isRequired,
  code: React.PropTypes.number.isRequired,
  isLink: React.PropTypes.bool
}

export default RefileButton
