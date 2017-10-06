import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchSignature from '../actions/fetchSignature.js'
import updateSignature from '../actions/updateSignature.js'
import checkSignature from '../actions/checkSignature.js'
import Signature from '../components/Signature.jsx'

export class SignatureContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this.props.isFetching && this.props.receipt === null)
      this.props.dispatch(fetchSignature())
  }

  render() {
    return <Signature {...this.props} />
  }
}

export function mapStateToProps(state) {
  const { isFetching, receipt, checked } = state.app.signature

  const { status } = state.app.submission

  const { error } = state.app

  return {
    isFetching,
    receipt,
    status,
    checked,
    error
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onSignatureClick: signed => {
      dispatch(updateSignature(signed))
    },
    onSignatureCheck: checked => {
      dispatch(checkSignature(checked))
    },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignatureContainer)
