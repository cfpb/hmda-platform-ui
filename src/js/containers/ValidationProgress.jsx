import { connect } from 'react-redux'
import ValidationProgress from '../components/ValidationProgress.jsx'

function mapStateToProps(state) {
  const {
    status
  } = state.app.submission || {
    status: {
      code: 3,
      message: ''
    }
  }

  return {status}
}

export default connect(mapStateToProps)(ValidationProgress)
