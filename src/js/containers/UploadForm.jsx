import { connect } from 'react-redux'
import Upload from '../components/UploadForm.jsx'
import { selectFile, requestUpload } from '../actions'

function mapStateToProps(state) {
  const {
    uploading,
    file
  } = state.app.upload || {
    uploading: false,
    file: null
  }

  return {
    uploading,
    file
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
