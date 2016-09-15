import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchSignature, updateSignature } from '../actions'
import Signature from '../components/Signature.jsx'

class SignatureContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // don't use dispatch here because we're overwriting dispatch in mapDispatchToProps() below
    //fetchSignature()

    let { dispatch } = this.props
    dispatch(fetchSignature)
  }

  render() {
    return <Signature {...this.props} />
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    timestamp,
    receipt,
    status
  } = state.app.signature || {
    isFetching: true,
    timestamp: null,
    receipt: null,
    status: {
      code: 1,
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
  return bindActionCreators({ updateSignature }, dispatch)

    /*onSignatureClick: (e) => {
      dispatch(updateSignature({signed: e.target.checked}))
    }*/
}

export default connect(mapStateToProps, mapDispatchToProps)(SignatureContainer)
