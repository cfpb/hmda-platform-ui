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
    file,
    errors
  } = state.app.upload[state.app.institution.id] || {
    uploading: false,
    percentUploaded: 0,
    file: null,
    newFile: null,
    filename: '',
    errors: []
  }

  const code = state.app.submission.status.code

  return {
    uploading,
    percentUploaded,
    filename,
    file,
    errors,
    code
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    setFile: (acceptedFiles) => {
      if(!acceptedFiles) return
      dispatch(selectFile(acceptedFiles[0]))
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
