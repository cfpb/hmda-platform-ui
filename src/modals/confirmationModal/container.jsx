import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import hideConfirm from './hideConfirm.js'
import fetchNewSubmission from '../../submission/fetchNewSubmission.js'
import refreshState from '../../refreshState.js'
import selectFile from '../../submission/upload/selectFile.js'
import fetchUpload from '../../submission/upload/fetchUpload.js'
import processFileErrors from '../../submission/upload/processFileErrors.js'
import checkFileErrors from '../../utils/checkFileErrors.js'
import ConfirmationModal from './index.jsx'

export class ConfirmationModalContainer extends Component {
  render() {
    return <ConfirmationModal {...this.props} />
  }
}

export function mapStateToProps(state) {
  const { showing } = state.app.confirmation
  const { id } = state.app.institution
  const { filingPeriod } = state.app
  const { code } = state.app.submission.status

  const { newFile } = state.app.upload[id] || {
    uploading: false,
    newFile: null,
    errors: []
  }

  return {
    id,
    filingPeriod,
    code,
    showing,
    newFile
  }
}

export function mapDispatchToProps(dispatch) {
  const hideConfirmModal = () => {
    dispatch(hideConfirm())
  }

  const triggerRefile = (id, period, page = '', file) => {
    dispatch(refreshState())
    if (page === 'upload' && file) {
      const fileErrors = checkFileErrors(file)
      if (fileErrors.length)
        return dispatch(processFileErrors(fileErrors, file.name))

      return dispatch(fetchNewSubmission(id, period)).then(() => {
        dispatch(selectFile(file))
        dispatch(fetchUpload(file))
      })
    } else {
      return dispatch(fetchNewSubmission(id, period)).then(() => {
        browserHistory.replace(`/${id}/${period}/upload`)
      })
    }
  }

  return {
    hideConfirmModal,
    triggerRefile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ConfirmationModalContainer
)
