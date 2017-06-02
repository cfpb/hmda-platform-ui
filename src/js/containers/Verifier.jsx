import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import fetchVerify from '../actions/fetchVerify.js'
import Verifier from '../components/Verifier.jsx'

class VerifierContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Verifier {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const {
    types
  } = state.app.edits

  const type = ownProps.type

  const verified = types[type].verified !== undefined
    ? types[type].verified
    : false

  const noEditsExist = !types[type].edits.length

  const code = state.app.submission.status.code

  return {
    type,
    verified,
    noEditsExist,
    code
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onVerify: (checked) => {
      dispatch(fetchVerify(ownProps.type, checked))
    }
  }
}

VerifierContainer.propTypes = {
  verified: React.PropTypes.bool.isRequired,
  noEditsExist: React.PropTypes.bool.isRequired,
  type: React.PropTypes.string.isRequired,
  onVerify: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifierContainer)
export {VerifierContainer, mapStateToProps, mapDispatchToProps }
