import { connect } from 'react-redux'
import Upload from '../components/UploadForm.jsx'
import selectFile from '../actions/selectFile.js'
import selectNewFile from '../actions/selectNewFile.js'
import fetchUpload from '../actions/fetchUpload.js'
import showConfirm from '../actions/showConfirm.js'
import pollForProgress from '../actions/pollForProgress.js'
import * as Poller from '../actions/Poller.js'

export function mapStateToProps(state) {
  const id = state.app.institution.id
  const code = state.app.submission.status.code
  const filename = state.app.submission.filename

  const { uploading, file, errors } = state.app.upload[id] || {
    uploading: false,
    file: null,
    newFile: null,
    errors: []
  }

  return {
    uploading,
    file,
    filename,
    errors,
    id,
    code
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    setFile: acceptedFiles => {
      if (!acceptedFiles) return
      dispatch(selectFile(acceptedFiles[0]))
      dispatch(fetchUpload(acceptedFiles[0]))
    },

    setNewFile: acceptedFiles => {
      if (!acceptedFiles) return
      dispatch(selectNewFile(acceptedFiles[0]))
    },

    showConfirmModal: () => {
      dispatch(showConfirm())
    },

    pollSubmission: () => {
      dispatch(pollForProgress(Poller.set(true)))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
