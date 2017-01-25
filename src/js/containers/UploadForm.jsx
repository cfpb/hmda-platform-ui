import { connect } from 'react-redux'
import Upload from '../components/UploadForm.jsx'
import { selectFile, requestUpload, createNewSubmission } from '../actions'

function mapStateToProps(state) {
  const {
    uploading,
    file
  } = state.app.upload || {
    uploading: false,
    file: null
  }

  const filingPeriod = state.app.filingPeriod

  return {
    uploading,
    file,
    filingPeriod
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: (e, file) => {
      e.preventDefault();
      if(file){
        dispatch(requestUpload(file))
      }
    },

    setFile: e => {
      if(!e.target.files) return
      dispatch(selectFile(e.target.files[0]))
    },

    refileLink: (id, period) => {
      console.log('container')
      console.log(id + ' and ' + period)
      dispatch(createNewSubmission(id, period))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
