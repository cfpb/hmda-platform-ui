import { connect } from 'react-redux'
import Upload from '../components/UploadForm.jsx'
import {
  selectFile,
  requestUpload,
  createNewSubmission,
  showConfirm
} from '../actions'

export function mapStateToProps(state) {
  console.log('UploadForm container')
  console.log(state)
  const {
    uploading,
    file,
    errors
  } = state.app.upload || {
    uploading: false,
    file: null,
    errors: []
  }

  const institutionId = state.app.institution.id

  const code = state.app.submission.status.code

  const filingPeriod = state.app.filingPeriod || null

  return {
    uploading,
    file,
    filingPeriod,
    errors,
    code,
    institutionId
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: (e, file) => {
      e.preventDefault()
      if(file){
        dispatch(requestUpload(file))
      }
    },

    setFile: (acceptedFiles) => {
      if(!acceptedFiles) return
      dispatch(selectFile(acceptedFiles[0]))
    },

    refileLink: (id, period) => {
      dispatch(createNewSubmission(id, period))
    },

    showConfirmModal: (id, filing, code, acceptedFiles) => {
      dispatch(showConfirm(id, filing, code))
      dispatch(selectFile(acceptedFiles[0]))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
