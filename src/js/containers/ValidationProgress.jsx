import { connect } from 'react-redux'
import ValidationProgress from '../components/ValidationProgress.jsx'
import { selectFile, requestUpload } from '../actions'

function mapStateToProps(state) {
  const {
    code
  } = state.app.submission.submission.status || {
    code: 3
  }

  return {
    code
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

export default connect(mapStateToProps, mapDispatchToProps)(ValidationProgress)
