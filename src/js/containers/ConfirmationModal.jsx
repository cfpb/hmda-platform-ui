import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { hideConfirm, createNewSubmission} from '../actions'
import ConfirmationModal from '../components/ConfirmationModal.jsx'

class ConfirmationModalContainer extends Component {
  constructor(props) {
      super(props)
  }

  render() {
    return <ConfirmationModal {...this.props} />
  }
}

function mapStateToProps(state) {
  const { id, filing, code, showing } = state.app.confirmation || {code: 0}

  return {id, filing, code, showing}
}

function mapDispatchToProps(dispatch) {
  const hideConfirmModal = () => {
    dispatch(hideConfirm())
  }

  const triggerRefile = (id, period) => {
    dispatch(createNewSubmission(id, period)).then(()=>{
      browserHistory.replace(`/${id}/${period}`)
    })
  }

  return {hideConfirmModal, triggerRefile}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModalContainer)