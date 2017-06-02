import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import BannerDeadline from '../components/BannerDeadline.jsx'

export class BannerDeadlineContainer extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return <BannerDeadline {...this.props} />
  }
}

export function mapStateToProps(state) {
  return {
    filingPeriod: state.app.filingPeriod
  }
}

export default connect(mapStateToProps)(BannerDeadlineContainer)
