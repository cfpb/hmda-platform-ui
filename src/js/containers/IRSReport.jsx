import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchIRS, updateIRS } from '../actions'
import IRSReport from '../components/IRSReport.jsx'

class IRSReportContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('IRSReportContainer - componentDidMount')
    this.props.dispatch(fetchIRS())
  }

  render() {
    return <IRSReport {...this.props} />
  }
}

function mapStateToProps(state) {
  console.log('IRSReportContainer - mapStateToProps')
  console.log(state)
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

IRSReportContainer.propTypes = {
  //dispatch: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    onIRSClick: (e) => {
      dispatch(updateIRS({verified: e.target.checked}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IRSReportContainer)
