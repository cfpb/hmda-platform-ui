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
  console.log('RefileButton - mapStateToProps')
  console.log(ownProps)
  const id = state.app.institution.id || ownProps.id
  const filing = state.app.filingPeriod || ownProps.filing
  const code = state.app.submission.status.code || ownProps.code 

  console.log({ id, filing, code })
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
  mapDispatchToProps
}
