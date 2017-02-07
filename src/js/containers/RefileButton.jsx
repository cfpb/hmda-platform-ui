import React, { Component } from 'react'
import { connect } from 'react-redux'
import RefileButton from '../components/RefileButton.jsx'
import { showConfirm } from '../actions'

class RefileButtonContainer extends Component {
  constructor(props) {
      super(props)
  }

  render() {
    return <RefileButton {...this.props} />
  }
}

function mapDispatchToProps(dispatch) {
  const showConfirmModal = (id, filing) => {
    dispatch(showConfirm(id, filing))
  }

  return {showConfirmModal}
}

export default connect(null, mapDispatchToProps)(RefileButtonContainer)
