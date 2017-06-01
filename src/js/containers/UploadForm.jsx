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
    file,
    errors
  } = state.app.upload

  const code = state.app.submission.status.code

  return {
    uploading,
    file,
    errors,
    code
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: (e, file) => {
      e.preventDefault()
      if(file){
        dispatch(fetchUpload(file))
      }
    },

    setFile: (acceptedFiles) => {
      if(!acceptedFiles) return
      dispatch(selectFile(acceptedFiles[0]))
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
