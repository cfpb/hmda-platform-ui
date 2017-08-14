import { connect } from 'react-redux'
import Upload from '../components/UploadForm.jsx'
import selectFile from '../actions/selectFile.js'
import selectNewFile from '../actions/selectNewFile.js'
import fetchUpload from '../actions/fetchUpload.js'
import createNewSubmission from '../actions/createNewSubmission.js'
import showConfirm from '../actions/showConfirm.js'
import pollForProgress from '../actions/pollForProgress.js'

export function mapStateToProps(state) {
  const {
    uploading,
    percentUploaded,
    filename,
    errors
  } = state.app.upload

  const code = state.app.submission.status.code

  return {
    uploading,
    percentUploaded,
    filename,
    errors,
    code
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    setFile: (acceptedFiles) => {
      if(!acceptedFiles) return
      dispatch(selectFile(acceptedFiles[0]))
      console.log('selecting')
      dispatch(fetchUpload(acceptedFiles[0]))
    },

    setNewFile: (acceptedFiles) => {
      if(!acceptedFiles) return
      dispatch(selectNewFile(acceptedFiles[0]))
    },

    showConfirmModal: () => {
      dispatch(showConfirm())
    },

    pollSubmission: () => {
      dispatch(pollForProgress())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
