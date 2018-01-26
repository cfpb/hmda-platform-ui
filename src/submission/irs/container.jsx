import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchIRS from './fetchIRS.js'
import cancelIRSFetch from './cancelIRSFetch.js'
import IRSReport from './index.jsx'
import fetchIRSCSV from './fetchIRSCSV.js'

export class IRSReportContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this.props.msas.length && !Object.keys(this.props.summary).length)
      this.props.dispatch(fetchIRS())
  }

  componentWillUnmount() {
    this.props.dispatch(cancelIRSFetch())
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.paginationFade !== nextProps.paginationFade) return true
    return !nextProps.paginationFade
  }

  render() {
    return <IRSReport {...this.props} />
  }
}

export function mapStateToProps(state) {
  const { isFetching, msas, summary } = state.app.irs

  const { id } = state.app.submission

  const pagination = state.app.pagination.irs
  const paginationFade = state.app.paginationFade.irs

  const renderTotals = state.app.pagination.irs
    ? state.app.pagination.irs._links.self ===
      state.app.pagination.irs._links.last
    : null

  return {
    isFetching,
    msas,
    summary,
    id,
    pagination,
    paginationFade,
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
