import React from 'react'
import { Link } from 'react-router'
import { FILING_PERIODS } from '../constants/dates.js'

import './YearSelector.css'

const YearSelector = props => {

  const currentYear = props.filingPeriod
  return (
    <div className="YearSelector">
      <h4>Select a filing period</h4>
      {Object.keys(FILING_PERIODS).sort().map((year, i) => {
        const className = year === currentYear ? 'active' : ''
        return (
          <Link to={props.pathname.replace(currentYear, year)} className={className} key={i}>
            {year}
          </Link>
        )
      })}
    </div>
  )
}

export default YearSelector
