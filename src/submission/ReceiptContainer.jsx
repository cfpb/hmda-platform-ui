import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchSignature from '../actions/fetchSignature.js'
import Receipt from './Receipt.jsx'

export function mapStateToProps(state) {
  const { timestamp, receipt } = state.app.signature

  const { status } = state.app.submission
  const { email } = state.app.user.oidc.profile

  const { filingPeriod } = state.app

  return {
    timestamp,
    receipt,
    status,
    filingPeriod,
    email
  }
}

export default connect(mapStateToProps)(Receipt)
