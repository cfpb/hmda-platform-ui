import { connect } from 'react-redux'
import RefileWarning from '../components/RefileWarning.jsx'

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

export default connect(mapStateToProps)(RefileWarning)
