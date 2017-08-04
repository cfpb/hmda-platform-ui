import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import hideConfirm from '../actions/hideConfirm.js'
import createNewSubmission from '../actions/createNewSubmission.js'
import selectFile from '../actions/selectFile.js'
import fetchUpload from '../actions/fetchUpload.js'
import ConfirmationModal from '../components/ConfirmationModal.jsx'

export class ConfirmationModalContainer extends Component {
  constructor(props) {
      super(props)
  }

  render() {
    return <ConfirmationModal {...this.props} />
  }
}

export function mapStateToProps(state) {
  const { showing } = state.app.confirmation
  const { id } = state.app.institution
  const { filingPeriod } = state.app
  const { code } = state.app.submission.status

  const {
    file,
    newFile
  } = state.app.upload

  return {
    id,
    filingPeriod,
    code,
    showing,
    file,
    newFile
  }
}

export function mapDispatchToProps(dispatch) {
  const hideConfirmModal = () => {
    dispatch(hideConfirm())
  }

  const triggerRefile = (id, period, page = '', file) => {
    if(page === 'upload' && file) {
      return dispatch(createNewSubmission(id, period)).then(() => {
        return dispatch(selectFile(file)).then(() => {
          return dispatch(fetchUpload(file))
        })
      })
    } else {
      return dispatch(createNewSubmission(id, period)).then(()=>{
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
