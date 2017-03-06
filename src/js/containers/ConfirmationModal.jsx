import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import {
  hideConfirm,
  createNewSubmission,
  selectFile
} from '../actions'
import ConfirmationModal from '../components/ConfirmationModal.jsx'

class ConfirmationModalContainer extends Component {
  constructor(props) {
      super(props)
  }

  render() {
    return <ConfirmationModal {...this.props} />
  }
}

function mapStateToProps(state) {
  const {
    id,
    filing,
    code,
    showing
  } = state.app.confirmation || { code: 0 }

  const {
    file,
    newFile
  } = state.app.upload

  return {
    id,
    filing,
    code,
    showing,
    file,
    newFile
  }
}

function mapDispatchToProps(dispatch) {
  const hideConfirmModal = () => {
    dispatch(hideConfirm())
  }

  const triggerRefile = (id, period, page = '', file) => {
    if(page === 'upload') {
      dispatch(selectFile(file))
      dispatch(createNewSubmission(id, period, page))
    } else {
      dispatch(createNewSubmission(id, period)).then(()=>{
        browserHistory.replace(`/${id}/${period}`)
      })
    }

  }

  return {
    hideConfirmModal,
    triggerRefile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModalContainer)
