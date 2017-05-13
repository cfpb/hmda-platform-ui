import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSummary, cancelSummaryFetch } from '../actions'
import Summary from '../components/Summary.jsx'

export class SummaryContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchSummary())
  }

  componentWillUnmount() {
    this.props.dispatch(cancelSummaryFetch())
  }

  render() {
    return <Summary {...this.props} />
  }
}

export function mapStateToProps(state) {
  const {
    isFetching,
    respondent,
    file
  } = state.app.summary || {
    isFetching: true,
    respondent: {},
    file: {}
  }

  return {
    isFetching,
    respondent,
    file
  }
}

export default connect(mapStateToProps)(SummaryContainer)
