import React from 'react'
import RefileText from './RefileText.jsx'

const ModalConfirm = (props) => {
  const { code, filing, id, showing, hideConfirmModal, triggerRefile } = props

  if(!filing || !id || !hideConfirmModal || !triggerRefile) return null

  return (
    <div className={'confirmation-blurred-blocker'+ (showing ? ' showing-blurred-blocker' : '')}>
      <div className="confirmation-modal">
        <RefileText code={code}/>
        <button onClick={(e)=>{
          e.preventDefault()
          hideConfirmModal()
          triggerRefile(id, filing)
        }}>Yes, I would like to resubmit.</button>
        <button className="usa-button usa-button-secondary"
          onClick={(e)=>{
            e.preventDefault()
            hideConfirmModal()
          }}>No, take me back.</button>
      </div>
    </div>
  )
}

ModalConfirm.propTypes = {
  filing: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  hideConfirmModal: React.PropTypes.func.isRequired,
  triggerRefile: React.PropTypes.func.isRequired,
  showing: React.PropTypes.bool,
  code: React.PropTypes.number
}

ModalConfirm.defaultProps = {
  showing: false,
  code: 0
}

export default ModalConfirm
