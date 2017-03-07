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

function mapStateToProps(state, ownProps) {
  let id, filing, code

  id = state.app.institution.id
  filing = state.app.filingPeriod
  code = state.app.submission.status.code

  if(ownProps) {
    id = ownProps.id
    filing = ownProps.filing
    code = ownProps.code
  }

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

RefileButtonContainer.propTypes = {
  id: React.PropTypes.string,
  filing: React.PropTypes.string,
  code: React.PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(RefileButtonContainer)
export {
  RefileButtonContainer,
  mapDispatchToProps,
  mapStateToProps
}
