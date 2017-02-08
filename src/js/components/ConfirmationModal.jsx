import React from 'react'
import RefileText from './RefileText.jsx'

const ModalConfirm = (props) => {
  return (
    <div className={'confirmation-blurred-blocker'+ (props.showing ? ' showing-blurred-blocker' : '')}>
      <div className="confirmation-modal">
      <div>
        <RefileText code={props.code}/>
        <button onClick={(e)=>{
          e.preventDefault()
          props.hideConfirmModal()
          props.triggerRefile(props.id, props.filing)
        }}>Yes</button>
        <button className="usa-button usa-button-secondary"
          onClick={(e)=>{
            e.preventDefault()
            props.hideConfirmModal()
          }}>No</button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirm
