import React from 'react'

import './YearSelector.css'

const YearSelector = props => {
  const currentYear = props.filingPeriod
  const { filingPeriods } = props.config

  return (
    <div className="YearSelector">
      <h4>Select a filing period</h4>
      {filingPeriods.map((year, i) => {
        const className = year === currentYear ? 'active' : ''
        return (
          <a href={props.pathname.replace(currentYear, year)} className={className} key={i}>
            {year}
          </a>
        )
      })}
    </div>
  )
}

export default YearSelector
