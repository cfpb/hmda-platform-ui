import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSignature } from '../actions'
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
  } = state.app.sign || {
    isFetching: false,
    timestamp: null,
    receipt: null
  }

  return {
    isFetching,
    timestamp,
    receipt
  }
}

export default connect(mapStateToProps)(SignatureContainer)
