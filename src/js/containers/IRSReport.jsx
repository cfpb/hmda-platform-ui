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
    irs
  } = state.app.irs || {
    isFetching: false,
    irs: {}
  }

  return {
    isFetching,
    irs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onIRSClick: (verified) => {
      dispatch(updateIRS({verified: verified}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IRSReportContainer)
