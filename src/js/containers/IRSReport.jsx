import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchIRS } from '../actions'
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
    msas
  } = state.app.irs || {
    isFetching: true,
    msas: []
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
    status
  }
}

export default connect(mapStateToProps)(IRSReportContainer)
