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
        styles={styleFn}
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
    .concat(['2020-Q3'])
    .map(periodOption)
    .sort((a,b) => {
      const years = [a,b].map(i => parseInt(i.label.split('-')[0]))
      if(years[0] === years[1])
        if(b.label.indexOf('-') > -1 && a.label.indexOf('-') < 0)
          return 1
      return years[1] - years[0]
    })

const periodOption = per => ({
  value: per,
  label: per
})

const padDate = d => (d < 10 ? `0${d}` : d)

const styleFn = {
  container: p => ({ ...p, zIndex: 1001 }),
  control: p => ({ ...p, zIndex: 1001 })
}

export default FilingPeriodSelector
