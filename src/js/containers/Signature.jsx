import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSignature, updateSignature, checkSignature } from '../actions'
import Signature from '../components/Signature.jsx'

export class SignatureContainer extends Component {
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

export function mapStateToProps(state) {
  const {
    isFetching,
    timestamp,
    receipt,
    checked
  } = state.app.signature || {
    isFetching: true,
    timestamp: null,
    receipt: null,
    checked: false
  }

  const {
    status
  } = state.app.submission || {
    status: {
      code: 12,
      message: ''
    }
  }

  const error = state.app.error

  return {
    isFetching,
    timestamp,
    receipt,
    status,
    checked,
    error
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onSignatureClick: (signed) => {
      dispatch(updateSignature(signed))
    },
    onSignatureCheck: (checked) => {
      dispatch(checkSignature(checked))
    },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignatureContainer)
