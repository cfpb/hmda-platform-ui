import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSignature, updateSignature } from '../actions'
import Signature from '../components/Signature.jsx'

class SignatureContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchSignature())
  }

  render() {
    return <Signature {...this.props} />
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    timestamp,
    receipt
  } = state.app.signature || {
    isFetching: true,
    timestamp: null,
    receipt: null
  }

  const {
    status
  } = state.app.submission || {
    status: {
      code: 12,
      message: ''
    }
  }

  return {
    isFetching,
    timestamp,
    receipt,
    status
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSignatureClick: (signed) => {
      dispatch(updateSignature({signed: signed}))
    },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignatureContainer)
