import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchVerifyQuality } from '../actions'
import QualityVerifier from '../components/QualityVerifier.jsx'

class QualityVerifierContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <QualityVerifier {...this.props} />
  }
}

function mapStateToProps(state) {
  const {
    types
  } = state.app.edits

  const verified = types && types.quality.verified !== undefined
    ? types.quality.verified
    : false

  return {
    verified
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onVerify: (checked) => {
      dispatch(fetchVerifyQuality(checked))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QualityVerifierContainer)
export {QualityVerifierContainer, mapStateToProps, mapDispatchToProps }
