import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchIRS from '../actions/fetchIRS.js'
import IRSReport from '../components/IRSReport.jsx'

export class IRSReportContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchIRS())
  }

  render() {
    return <IRSReport {...this.props} />
  }
}

export function mapStateToProps(state) {
  const {
    isFetching,
    msas,
    summary
  } = state.app.irs || {
    isFetching: true,
    msas: [],
    summary: {}
  }

  const {
    status
  } = state.app.submission || {
    status: {
      code: 10,
      message: ''
    }
  }

  return {
    isFetching,
    msas,
    summary,
    status
  }
}

export default connect(mapStateToProps)(IRSReportContainer)
