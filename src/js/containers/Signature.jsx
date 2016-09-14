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

  return {
    isFetching,
    timestamp,
    receipt
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSignatureClick: (e) => {
      dispatch(updateSignature({signed: e.target.checked}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signature)
