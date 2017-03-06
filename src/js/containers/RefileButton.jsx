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

function mapStateToProps(state) {
  const id = state.app.institution.id
  const filing = state.app.filingPeriod
  const code = state.app.submission.status.code

  return {
    id,
    filing,
    code
  }
}

function mapDispatchToProps(dispatch) {
  const showConfirmModal = (id, filing, code) => {
    dispatch(showConfirm(id, filing, code))
  }

  return { showConfirmModal }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefileButtonContainer)
export {
  RefileButtonContainer,
  mapDispatchToProps
}
