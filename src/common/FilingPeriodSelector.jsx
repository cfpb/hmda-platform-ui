import React from 'react'
import { FILING_PERIODS, FILING_QUARTERS } from '../constants/dates.js'
import Select from 'react-select'
import './YearSelector.css'

const FilingPeriodSelector = ({ filingPeriod, pathname }) => {
  const period = periodOption(filingPeriod)
  return (
    <div className='YearSelector'>
      <h4>Select a filing period</h4>
      <Select
        value={period}
        options={options()}
        onChange={o => window.location = pathname.replace(filingPeriod, o.value)}
      />
    </div>
  )
}

const currentQuarterlyFilingPeriod = (d = new Date()) => {
  const month = d.getMonth() + 1
  const day = d.getDate() + 1
  const monthDay = `${padDate(month)}/${padDate(day)}`

  for (let quarter of Object.keys(FILING_QUARTERS)) {
    let [lower, upper] = FILING_QUARTERS[quarter].split(' - ')
    if (monthDay >= lower && monthDay <= upper)
      return [`${d.getFullYear()}-${quarter.toUpperCase()}`]
  }

  return []
}

const options = () =>
  currentQuarterlyFilingPeriod()
    .concat(FILING_PERIODS)
    .map(periodOption)

const periodOption = per => ({
  value: per,
  label: per
})

const padDate = d => (d < 10 ? `0${d}` : d)

export default FilingPeriodSelector
