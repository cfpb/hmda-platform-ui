import React from 'react'
import PropTypes from 'prop-types'

const FilingPeriodSelector = props => {
  return (
    <form className="FilingPeriodSelector usa-form">
      <select value={props.filingPeriod} onChange={props.selectFilingPeriod}>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
      </select>
    </form>
  )
}

FilingPeriodSelector.propTypes = {
  filingPeriod: PropTypes.string,
  selectFilingPeriod: PropTypes.func
}

export default FilingPeriodSelector
