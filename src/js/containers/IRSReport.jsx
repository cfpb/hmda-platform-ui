import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchIRS from '../actions/fetchIRS.js'
import cancelIRSFetch from '../actions/cancelIRSFetch.js'
import IRSReport from '../components/IRSReport.jsx'
import fetchIRSCSV from '../actions/fetchIRSCSV.js'

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
  console.log(state)
  const {
    isFetching,
    msas,
    summary
  } = state.app.irs

  const {
    status
  } = state.app.submission

  const renderTotals = state.app.pagination.irs ?
  (state.app.pagination.irs._links.self === state.app.pagination.irs._links.last) :
  null

  return {
    isFetching,
    msas,
    summary,
    status,
    renderTotals
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // triggered by a click on "Download IRS"
    onDownloadClick: (institutionId, filing, submissionId) => {
      dispatch(fetchIRSCSV(institutionId, filing, submissionId))
    },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IRSReportContainer)
