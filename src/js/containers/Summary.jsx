import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchSummary from '../actions/fetchSummary.js'
import Summary from '../components/Summary.jsx'

export class SummaryContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if(!this.props.respondent && !this.props.file) this.props.dispatch(fetchSummary())
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
  } = state.app.summary

  return {
    isFetching,
    respondent,
    file
  }
}

export default connect(mapStateToProps)(SummaryContainer)
