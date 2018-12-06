import React, { Component } from 'react'
import { connect } from 'react-redux'
import RefileButton from './index.jsx'
import showConfirm from '../actions/showConfirm.js'
import setInstitution from '../actions/setInstitution.js'

class RefileButtonContainer extends Component {
  render() {
    return <RefileButton {...this.props} />
  }
}

function mapDispatchToProps(dispatch) {
  const showConfirmModal = () => {
    dispatch(showConfirm())
  }

  const updateInstitution = id => {
    dispatch(setInstitution(id))
  }

  return { showConfirmModal, updateInstitution }
}

export default connect(
  null,
  mapDispatchToProps
)(RefileButtonContainer)
export { RefileButtonContainer, mapDispatchToProps }
