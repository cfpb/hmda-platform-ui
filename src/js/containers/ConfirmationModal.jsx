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
    console.log(this.props)
    return <ConfirmationModal {...this.props} />
  }
}

function mapStateToProps(state) {
  const { id, filing, showing } = state.app.confirmation || {}

  return {id, filing, showing}
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
