import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchIRS } from '../actions'
import IRSReport from '../components/IRSReport.jsx'

class IRSReportContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(fetchIRS())
  }

  toggleCheck(e) {
    // TODO - this.props.dispatch(postIRS())
  }

  render() {
    return <IRSReport {...this.props} />
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    irs,
    isChecked
  } = state.app.irs || {
    isFetching: false,
    irs: {},
    isChecked: false
  }

  return {
    isFetching,
    irs,
    isChecked
  }
}

export default connect(mapStateToProps)(IRSReportContainer)
