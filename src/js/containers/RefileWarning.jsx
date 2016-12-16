import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import RefileWarning from '../components/RefileWarning.jsx'
import { createNewSubmission } from '../actions'

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
    syntactical: {edits: []},
    validity: {edits: []},
    quality: {edits: []},
    macro: {edits: []}
  }}

  return {submission, types}
}

function mapDispatchToProps(dispatch) {
  const refileLink = (id, period) => {
    dispatch(createNewSubmission(id, period)).then(()=>{
      browserHistory.replace(`/${id}/${period}`)
    })
  }

  return {refileLink}
}

export default connect(mapStateToProps, mapDispatchToProps)(RefileWarning)
