import React from 'react'
import RefileText from './RefileText.jsx'

const ModalConfirm = (props) => {
  const {
    code,
    filing,
    id,
    showing,
    file,
    newFile,
    hideConfirmModal,
    triggerRefile
  } = props

  // get the page
  const page = location.pathname.split('/').slice(-1)[0]

  if(!filing || !id || !hideConfirmModal || !triggerRefile) return null

  return (
    <div className={'confirmation-blurred-blocker'+ (showing ? ' showing-blurred-blocker' : '')}>
      <div className="confirmation-modal">
        <div className="confirmation-contents">
          <RefileText code={code}/>
          <button onClick={(e)=>{
            e.preventDefault()
            hideConfirmModal()
            triggerRefile(id, filing, page, newFile)
          }}>Yes, restart the filing process.</button>
          <a href="#"
            className="usa-text-small"
            onClick={(e)=>{
              e.preventDefault()
              hideConfirmModal()
            }}>No, take me back.</a>
        </div>
      </div>
    </div>
  )
}

ModalConfirm.propTypes = {
  filing: React.PropTypes.string,
  id: React.PropTypes.string,
  hideConfirmModal: React.PropTypes.func,
  triggerRefile: React.PropTypes.func,
  showing: React.PropTypes.bool,
  code: React.PropTypes.number,
  file: React.PropTypes.object,
  newFile: React.PropTypes.object
}

ModalConfirm.defaultProps = {
  showing: false,
  code: 0
}

export default ModalConfirm
