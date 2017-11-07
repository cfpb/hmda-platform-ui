import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import hideConfirm from '../actions/hideConfirm.js'
import fetchNewSubmission from '../actions/fetchNewSubmission.js'
import refreshState from '../actions/refreshState.js'
import selectFile from '../actions/selectFile.js'
import fetchUpload from '../actions/fetchUpload.js'
import processFileErrors from '../actions/processFileErrors.js'
import checkFileErrors from '../utils/checkFileErrors.js'
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

  const { file, newFile } = state.app.upload[id] || {
    uploading: false,
    file: null,
    newFile: null,
    errors: []
  }

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
