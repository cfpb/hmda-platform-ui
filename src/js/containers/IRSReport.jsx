import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchIRS from '../actions/fetchIRS.js'
import cancelIRSFetch from '../actions/cancelIRSFetch.js'
import IRSReport from '../components/IRSReport.jsx'

export class IRSReportContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchIRS())
  }

  componentWillUnmount() {
    this.props.dispatch(cancelIRSFetch())
  }

  render() {
    return <IRSReport {...this.props} />
  }
}

export function mapStateToProps(state) {
  console.log('IRS')
  //console.log(state)
  console.log(state.app.pagination)
  console.log(state.app.irs)
  //console.log(state.app.pagination.irs._links.self === state.app.pagination.irs._links.last)
  const {
    isFetching,
    msas,
    summary
  } = state.app.irs

  const {
    status
  } = state.app.submission

  const renderFooter = (state.app.pagination.irs._links.self === state.app.pagination.irs.last)

  return {
    isFetching,
    msas,
    summary,
    status,
    renderFooter
  }
}

export default connect(mapStateToProps)(IRSReportContainer)
