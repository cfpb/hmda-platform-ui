import { connect } from 'react-redux'
import ValidationProgress from '../components/ValidationProgress.jsx'

function mapStateToProps(state) {
  const {
    submission
  } = state.app.submission || {
    submission: {
      id: 1,
      status: {
        code: 3,
        message: ''
      }
    }
  }

  return submission
}

export default connect(mapStateToProps)(ValidationProgress)
