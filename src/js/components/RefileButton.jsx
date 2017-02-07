import React from 'react'

const RefileButton = (props) => {
  return <a className="usa-button usa-button-secondary usa-text-small"
    onClick={(e)=>{
      e.preventDefault()
      props.showConfirmModal(props.id, props.filing)
    }}
    >Refile</a>
}

RefileButton.propTypes = {
  showConfirmModal: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
  filing: React.PropTypes.string.isRequired
}

export default RefileButton
