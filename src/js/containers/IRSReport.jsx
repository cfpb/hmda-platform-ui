import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchIRS, updateIRS } from '../actions'
import IRSReport from '../components/IRSReport.jsx'

class IRSReportContainer extends Component {
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

function mapStateToProps(state) {
  const {
    isFetching,
    msas,
    timestamp,
    receipt
  } = state.app.irs || {
    isFetching: true,
    msas: [],
    timestamp: null,
    receipt: null
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
    timestamp,
    receipt,
    status
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onIRSClick: (verified) => {
      dispatch(updateIRS({verified: verified}))
    },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IRSReportContainer)
