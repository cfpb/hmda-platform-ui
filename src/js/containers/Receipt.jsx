import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchSignature from '../actions/fetchSignature.js'
import Receipt from '../components/Receipt.jsx'

export class ReceiptContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if(!this.props.isFetching && this.props.receipt === null) this.props.dispatch(fetchSignature())
  }

  render() {
    return <Receipt {...this.props} />
  }
}

export function mapStateToProps(state) {
  const {
    isFetching,
    timestamp,
    receipt
  } = state.app.signature

  const { status } = state.app.submission
  const { email }  = state.oidc.user.profile

  const { filingPeriod } = state.app


  return {
    isFetching,
    timestamp,
    receipt,
    status,
    filingPeriod,
    email
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptContainer)
