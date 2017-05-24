import React, { Component } from 'react'
import { connect } from 'react-redux'
import RefileButton from '../components/RefileButton.jsx'
import showConfirm from '../actions/showConfirm.js'

class RefileButtonContainer extends Component {
  constructor(props) {
      super(props)
  }

  render() {
    return <RefileButton {...this.props} />
  }
}

function mapDispatchToProps(dispatch) {
  const showConfirmModal = () => {
    dispatch(showConfirm())
  }

  return { showConfirmModal }
}

export default connect(null, mapDispatchToProps)(RefileButtonContainer)
export {
  RefileButtonContainer,
  mapDispatchToProps
}
