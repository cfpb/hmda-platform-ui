import { connect } from 'react-redux'
import RefileWarning from '../components/RefileWarning.jsx'
import { fetchNewSubmission } from '../actions'

function mapStateToProps(state) {
  const {
   submission
  } = state.app || {
    status: {
      code: 3,
      message: ''
    }
  }

  const {
    types
  } = state.app.edits || {types: {
    syntactical: [],
    validity: [],
    quality: [],
    macro: []
  }}

  return {submission, types}
}

function mapDispatchToProps(dispatch) {
  const refileLink = (e) => {
    e.preventDefault()
    dispatch(fetchNewSubmission())
  }
  return {refileLink}
}

export default connect(mapStateToProps, mapDispatchToProps)(RefileWarning)
