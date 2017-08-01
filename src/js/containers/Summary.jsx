import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchSummary from '../actions/fetchSummary.js'
import Summary from '../components/Summary.jsx'

export class SummaryContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if(!Object.keys(this.props.respondent).length &&
       !Object.keys(this.props.file).length) {
         this.props.dispatch(fetchSummary())
    }
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
