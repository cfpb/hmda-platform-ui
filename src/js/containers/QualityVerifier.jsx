import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchVerifyQuality } from '../actions'
import QualityVerifier from '../components/QualityVerifier.jsx'

export class QualityVerifierContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <QualityVerifier {...this.props} />
  }
}

export function mapStateToProps(state) {
  const {
    types
  } = state.app.edits

  const verified = types ? types.quality.verified : null

  return {
    verified
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onVerify: (checked) => {
      dispatch(fetchVerifyQuality(checked))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QualityVerifierContainer)
