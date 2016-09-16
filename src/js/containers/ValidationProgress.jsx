import { connect } from 'react-redux'
import ValidationProgress from '../components/ValidationProgress.jsx'

function mapStateToProps(state) {
  console.log('ValidationProgress - container')
  console.log(state.app.submission)
  console.log(state.app.submission.status)
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
