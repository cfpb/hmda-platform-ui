import React from 'react'

const RefileButton = (props) => {
  return <a className={`RefileButton usa-button usa-button-secondary usa-text-small `}
    onClick={(e)=>{
      e.preventDefault()
      props.showConfirmModal(props.id, props.filing, props.code)
    }}>Upload a new file</a>
}

RefileButton.propTypes = {
  showConfirmModal: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
  filing: React.PropTypes.string.isRequired,
  code: React.PropTypes.number.isRequired
}

export default RefileButton
