import React, { Component } from 'react'
import { connect } from 'react-redux'
import FilingPeriodSelector from './FilingPeriodSelector.jsx'
import updateFilingPeriod from '../actions/updateFilingPeriod.js'
import fetchFilingsByPeriod from '../actions/fetchFilingsByPeriod.js'

class FilingPeriodSelectorContainer extends Component {
  render() {
    return <FilingPeriodSelector {...this.props} />
  }
}

function mapStateToProps(state) {
  const { filingPeriod } = state.app
  return { filingPeriod }
}

function mapDispatchToProps(dispatch) {
  const selectFilingPeriod = e => {
    dispatch(updateFilingPeriod(e.target.value))
    dispatch(fetchFilingsByPeriod(e.target.value))
  }

  return { selectFilingPeriod }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  FilingPeriodSelectorContainer
)
export { FilingPeriodSelectorContainer, mapStateToProps, mapDispatchToProps }
